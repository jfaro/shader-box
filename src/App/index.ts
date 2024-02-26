import * as THREE from "three"
import { SHADER_CATALOG } from "../constants";

export default class App {
    // User selection state.
    activeShader: number;

    // Scene properties.
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
    clock: THREE.Clock;
    geometry: THREE.PlaneGeometry;
    material: THREE.ShaderMaterial;
    mesh: THREE.Mesh;
    uniforms: { [uniform: string]: THREE.IUniform<any>; };

    constructor() {
        this.activeShader = 0;

        this.camera = new THREE.Camera();
        this.camera.position.z = 1;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();

        // Uniform definition.
        this.uniforms = {
            u_time: { value: 1.0 },
            u_resolution: { value: new THREE.Vector2() },
            u_mouse: { value: new THREE.Vector2() }
        };

        // Create mesh.
        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: SHADER_CATALOG[0].vertex,
            fragmentShader: SHADER_CATALOG[0].fragment
        });

        // Setup scene.
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        // Initialize renderer.
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio)

        // Add renderer to DOM.
        const app = document.getElementById("shader-container");
        if (app) {
            app.appendChild(this.renderer.domElement);
        } else {
            throw new Error("no app element in DOM");
        }

        // Handle button press.
        const nextButton = document.getElementById("button-next");
        if (nextButton) {
            nextButton.onclick = () => {
                console.log("next")
                this.nextShader();
            }
        }
        const prevButton = document.getElementById("button-prev");
        if (prevButton) {
            prevButton.onclick = () => {
                console.log("prev")
                this.prevShader();
            }
        }
        this.updateLabel();

        // Handle window resize.
        this.onWindowResize();
        window.addEventListener("resize", this.onWindowResize, false);

        // Handle mouse.
        document.onmousemove = (e) => {
            this.uniforms.u_mouse.value.x = e.pageX;
            this.uniforms.u_mouse.value.y = e.pageY;
        }

        // Begin animation loop.
        this.animate()
    }

    // Window resize handler.
    onWindowResize() {
        const canvasContainer = this.renderer?.domElement.parentElement;
        if (canvasContainer) {
            this.renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight)
        }
        if (this.uniforms) {
            this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
            this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
        }
    }

    // Render loop.
    animate() {
        requestAnimationFrame(() => this.animate());
        this.render();
    }

    // Render loop update function.
    render() {
        this.uniforms.u_time.value += this.clock.getDelta();
        this.renderer.render(this.scene, this.camera)
    }

    // Update rendered shader label.
    updateLabel() {
        const shaderLabel = document.getElementById("shader-label");
        if (shaderLabel) {
            shaderLabel.innerHTML = "";
            shaderLabel.append(SHADER_CATALOG[this.activeShader].name)
        }
    }

    // Set the active shader to the next in the catalog.
    nextShader() {
        this.activeShader = (this.activeShader + 1) % SHADER_CATALOG.length;
        this.updateMaterial();
        this.updateLabel();
    }

    // Set the active shader to the previous in the catalog.
    prevShader() {
        if (this.activeShader == 0) {
            this.activeShader = SHADER_CATALOG.length - 1;
        } else {
            this.activeShader = this.activeShader - 1;
        }
        this.updateMaterial();
        this.updateLabel();
    }

    // Update the active material used in the scene.
    updateMaterial() {
        this.material.vertexShader = SHADER_CATALOG[this.activeShader].vertex;
        this.material.fragmentShader = SHADER_CATALOG[this.activeShader].fragment;
        this.material.needsUpdate = true
    }
}

