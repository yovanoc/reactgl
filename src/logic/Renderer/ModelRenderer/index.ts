import Camera from "../../Camera";
import { GLCommander } from "../../GLCommander";
import Light from "../../LightSource";
import ModelInstance from "../../Models/ModelInstance";
import ModelType from "../../Models/ModelType";
import ModelShader from "../../Shaders/ModelShader";

export interface IModels {
  type: ModelType;
  instances: ModelInstance[];
}

export default class ModelRenderer {
  public shader: ModelShader;
  private models: Map<string, IModels>;
  private glc: GLCommander;

  constructor(glc: GLCommander) {
    this.shader = new ModelShader(glc);
    this.models = new Map();
    this.glc = glc;
  }

  public registerNewModel(model: ModelType, id: string) {
    if (!this.models.has(id)) {
      this.models.set(id, {
        instances: [],
        type: model
      });
    }
  }

  public addInstance(instance: ModelInstance, id: string) {
    const m = this.models.get(id);
    if (!m) {
      throw new Error(`There is no models with the id ${id}`);
    }
    m.instances.push(instance);
  }

  public render(light: Light, camera: Camera) {
    this.preRender();
    this.shader.use();
    this.shader.enableLight(light);
    camera.enable(this.shader);
    for (const [, v] of this.models) {
      v.type.use(this.shader);
      for (const i of v.instances) {
        this.shader.enableTransformationMatrix(i.transformationMatrix!);
        this.glc.drawTriangles(v.type.indices.length);
      }
    }
  }

  private preRender() {
    this.glc.viewport();
    this.glc.depthTest(true);
  }
}
