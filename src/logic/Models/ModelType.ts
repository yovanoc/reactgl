import { GLCommander } from "../GLCommander";
import Material from "../Materials/Material";
import ModelShader from "../Shaders/ModelShader";

export default class ModelType {
  private vertexBuffer: WebGLBuffer | null = null;
  private indexBuffer: WebGLBuffer | null = null;
  private normalBuffer: WebGLBuffer | null = null;
  private textureCoordBuffer: WebGLBuffer | null = null;
  private material: Material;
  private gl: GLCommander;

  constructor(
    public vertices: number[],
    public indices: number[],
    public normals: number[],
    public textureCoords: number[],
    gl: GLCommander
  ) {
    this.gl = gl;
    this.genTextureCoordBuffer();
    this.genVertexBuffer();
    this.genIndexBuffer();
    this.genNormalBuffer();
    this.material = new Material(this.gl);
  }

  public use(shader: ModelShader) {
    this.gl.bindArrayBuffer(this.vertexBuffer!);
    shader.enablePosition();
    this.gl.bindArrayBuffer(this.textureCoordBuffer!);
    shader.enableTextureCoords();
    this.gl.bindArrayBuffer(this.normalBuffer!);
    shader.enableNormals();
    this.gl.bindElementArrayBuffer(this.indexBuffer!);
    this.material.enable(shader);
  }

  public addMaterial = (material: Material) => {
    this.material = material;
  };

  private genVertexBuffer() {
    this.vertexBuffer = this.gl.createBuffer()!;
    this.gl.bindArrayBuffer(this.vertexBuffer);
    this.gl.addArrayBufferData(this.vertices);
    this.gl.unbindArrayBuffer();
  }

  private genIndexBuffer() {
    this.indexBuffer = this.gl.createBuffer()!;
    this.gl.bindElementArrayBuffer(this.indexBuffer);
    this.gl.addElementArrayBufferData(this.indices);
    this.gl.unbindElementArrayBuffer();
  }

  private genNormalBuffer() {
    this.normalBuffer = this.gl.createBuffer()!;
    this.gl.bindArrayBuffer(this.normalBuffer);
    this.gl.addArrayBufferData(this.normals);
    this.gl.unbindArrayBuffer();
  }

  private genTextureCoordBuffer() {
    this.textureCoordBuffer = this.gl.createBuffer()!;
    this.gl.bindArrayBuffer(this.textureCoordBuffer);
    this.gl.addArrayBufferData(this.textureCoords);
    this.gl.unbindArrayBuffer();
  }
}
