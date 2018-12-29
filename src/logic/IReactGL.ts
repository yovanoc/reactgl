import Camera from "./Camera";
import MouseListener from "./EventHandlers/Mouse";
import Light from "./LightSource";
import Material from "./Materials/Material";
import ModelInstance from "./Models/ModelInstance";
import ModelType from "./Models/ModelType";
import ModelRenderer from "./Renderer/ModelRenderer";
import ModelShader from "./Shaders/ModelShader";

export interface IReactGL {
  MouseEvent: MouseListener;
  createModelRenderer: () => ModelRenderer;
  createModelType: (
    vertices: number[],
    indices: number[],
    normals: number[],
    textureCoords: number[]
  ) => ModelType;
  createModelShader: () => ModelShader;
  createLight: (
    x: number,
    y: number,
    z: number,
    r: number,
    g: number,
    b: number,
    ambient: number
  ) => Light;

  createModelInstance: (
    x: number,
    y: number,
    z: number,
    rx: number,
    ry: number,
    rz: number,
    scale: number
  ) => ModelInstance;

  createMaterial: () => Material;

  createCamera: (
    x?: number,
    y?: number,
    z?: number,
    pitch?: number,
    yaw?: number,
    roll?: number,
    near?: number,
    far?: number,
    fov?: number
  ) => Camera;

  clear: (red: number, green: number, blue: number, alpha: number) => void;
}
