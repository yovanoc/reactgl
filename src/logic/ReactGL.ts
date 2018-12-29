import Camera from "./Camera";
import MouseListener from "./EventHandlers/Mouse";
import { GLCommander } from "./GLCommander";
import { IReactGL } from "./IReactGL";
import Light from "./LightSource";
import Material from "./Materials/Material";
import ModelInstance from "./Models/ModelInstance";
import ModelType from "./Models/ModelType";
import ModelRenderer from "./Renderer/ModelRenderer";
import ModelShader from "./Shaders/ModelShader";

export class ReactGL implements IReactGL {
  public MouseEvent: MouseListener;

  constructor(private glc: GLCommander) {
    this.MouseEvent = new MouseListener(this.glc);
  }

  public createModelRenderer = () => new ModelRenderer(this.glc);

  public createModelType = (
    vertices: number[],
    indices: number[],
    normals: number[],
    textureCoords: number[]
  ) => new ModelType(vertices, indices, normals, textureCoords, this.glc);

  public createModelShader = () => new ModelShader(this.glc);

  public createLight = (
    x: number,
    y: number,
    z: number,
    r: number,
    g: number,
    b: number,
    ambient: number
  ) => new Light(x, y, z, r, g, b, ambient);

  public createModelInstance = (
    x: number,
    y: number,
    z: number,
    rx: number,
    ry: number,
    rz: number,
    scale: number
  ) => new ModelInstance(x, y, z, rx, ry, rz, scale);

  public createMaterial = () => new Material(this.glc);

  public createCamera = (
    x?: number,
    y?: number,
    z?: number,
    pitch?: number,
    yaw?: number,
    roll?: number,
    near?: number,
    far?: number,
    fov?: number
  ) => new Camera(x, y, z, pitch, yaw, roll, near, far, fov, this.glc);

  public clear = (red: number, green: number, blue: number, alpha: number) =>
    this.glc.clear(red, green, blue, alpha);
}
