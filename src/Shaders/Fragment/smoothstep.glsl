#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0 - 1.0.
float plot(vec2 st) {
    return smoothstep(0.01, 0.0, abs(st.y - st.x));
}

void main() {
    // Get x,y as values between 0.0 - 1.0.
    vec2 st = gl_FragCoord.xy/u_resolution;
    float y = st.x;

    // Initial gradient value.
    vec3 color = vec3(y);

    // pct is high along the diagonal. Add more green when pct is higher.
    float pct = plot(st);
    color = (1.0-pct)*color + pct*vec3(0.0,1.0,0.0);

    gl_FragColor=vec4(color,1.0);
}