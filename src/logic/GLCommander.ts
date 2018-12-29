import { vec3 } from "gl-matrix";
import { Locations } from "./Shaders/ModelShader/Locations";

export class GLCommander {
  constructor(public gl: WebGLRenderingContext) {}

  public clear(r: number, g: number, b: number, a: number) {
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public viewport = () =>
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

  public depthTest = (use: boolean) =>
    use
      ? this.gl.enable(this.gl.DEPTH_TEST)
      : this.gl.disable(this.gl.DEPTH_TEST);

  public createBuffer = () => this.gl.createBuffer();

  // Float Buffers
  public bindArrayBuffer = (buffer: WebGLBuffer) =>
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  public unbindArrayBuffer = () =>
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

  public addArrayBufferData = (vertices: number[]) =>
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      this.gl.STATIC_DRAW
    );

  // Int Buffers
  public bindElementArrayBuffer = (buffer: WebGLBuffer) =>
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
  public unbindElementArrayBuffer = () =>
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  public addElementArrayBufferData = (indices: number[]) =>
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      this.gl.STATIC_DRAW
    );

  // Shader functions
  public createVertexShader = () => this.gl.createShader(this.gl.VERTEX_SHADER);
  public createFragmentShader = () =>
    this.gl.createShader(this.gl.FRAGMENT_SHADER);
  public addShaderSource = (shader: WebGLShader, source: string) =>
    this.gl.shaderSource(shader, source);
  public compileShader = (shader: WebGLShader) => this.gl.compileShader(shader);
  public createShaderProgram = () => this.gl.createProgram();
  public attachShaderToProgram = (program: WebGLProgram, shader: WebGLShader) =>
    this.gl.attachShader(program, shader);
  public linkProgram = (program: WebGLProgram) => this.gl.linkProgram(program);
  public getAttribLocation = (program: WebGLProgram, attribute: Locations) =>
    this.gl.getAttribLocation(program, attribute);
  public useProgram = (program: WebGLProgram) => this.gl.useProgram(program);
  public enableVertexAttribArray = (attribute: number) =>
    this.gl.enableVertexAttribArray(attribute);
  public pointToAttribute = (position: number, dimensions: number) =>
    this.gl.vertexAttribPointer(
      position,
      dimensions,
      this.gl.FLOAT,
      false,
      0,
      0
    );

  public drawTriangles = (indicesLength: number) =>
    this.gl.drawElements(
      this.gl.TRIANGLES,
      indicesLength,
      this.gl.UNSIGNED_SHORT,
      0
    );

  public getUniformLocation = (program: WebGLProgram, uniform: string) =>
    this.gl.getUniformLocation(program, uniform);

  public uploadMatrix4fv = (
    location: WebGLUniformLocation,
    matrix: Float32List
  ) => this.gl.uniformMatrix4fv(location, false, matrix);
  public uploadVec3f = (location: WebGLUniformLocation, value: vec3) =>
    this.gl.uniform3fv(location, value);

  public uploadFloat = (location: WebGLUniformLocation, value: number) =>
    this.gl.uniform1f(location, value);

  public uploadInt = (location: WebGLUniformLocation, value: number) =>
    this.gl.uniform1i(location, value);
  public uploadBool = (location: WebGLUniformLocation, value: boolean) =>
    this.gl.uniform1i(location, value ? 1 : 0);

  public createTexture = () => this.gl.createTexture();
  public bindTexture = (texture: WebGLTexture) =>
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
  public activeTexture = (texture: number) =>
    this.gl.activeTexture(this.gl.TEXTURE0 + texture);
  public defineTexture = (img: TexImageSource) =>
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      img
    );
  public defineDummyTexture = () =>
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      1,
      1,
      0,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255])
    );

  public texturePowerOfTwo = () => this.gl.generateMipmap(this.gl.TEXTURE_2D);
  public textureNoPowerOfTwo = () => {
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
  };
}
