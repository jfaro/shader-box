import { BasicVertex, GradientGreenRedFragment, GradientRedGreenFragment } from "./Shaders"

interface IShader {
    name: string;
    vertex: string;
    fragment: string;
}

type Catalog = IShader[];

// Entire shader box catalog.
export const SHADER_CATALOG: Catalog = [
    {
        name: "Basic Green-Red",
        vertex: BasicVertex,
        fragment: GradientGreenRedFragment,
    },
    {
        name: "Basic Red-Green",
        vertex: BasicVertex,
        fragment: GradientRedGreenFragment,
    }
]