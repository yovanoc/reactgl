import { GLCommander } from "../GLCommander";
import ModelShader from "../Shaders/ModelShader";
import Texture from "./Texture";

export default class Material {
  private diffuse: Texture;

  constructor(private gl: GLCommander) {
    this.diffuse = new Texture(this.gl);
  }

  public addDiffuse = (url: string) => {
    this.diffuse.loadTexture(url);
    return this;
  };

  public enable = (shader: ModelShader) => this.enableDiffuse(shader);

  private enableDiffuse = (shader: ModelShader) => {
    this.gl.activeTexture(0);
    this.diffuse.enable();
    this.gl.uploadInt(shader.diffuseTexture, 0);
    this.gl.uploadBool(shader.hasDiffuseTexture, this.diffuse.hasTexture());
  };
}
