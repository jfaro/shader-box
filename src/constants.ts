import { FragGradient, FragSolid, FragTime, Smoothstep, VertBasic } from "./Shaders"

interface IShader {
    name: string;
    vertex: string;
    fragment: string;
}

export const SHADER_CATALOG: IShader[] = [
    {
        name: "Solid",
        vertex: VertBasic,
        fragment: FragSolid,
    },
    {
        name: "Gradient",
        vertex: VertBasic,
        fragment: FragGradient,
    },
    {
        name: "Time",
        vertex: VertBasic,
        fragment: FragTime,
    },
    {
        name: "Smoothstep",
        vertex: VertBasic,
        fragment: Smoothstep,
    }
]