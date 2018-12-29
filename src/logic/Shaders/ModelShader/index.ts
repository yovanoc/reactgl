import { mat4 } from "gl-matrix";
import { GLCommander } from "../../GLCommander";
import Light from "../../LightSource";
import FragmentSource from "./Fragment";
import { Locations } from "./Locations";
import VertexSource from "./Vertex";

export default class ModelShader {
  public diffuseTexture: WebGLUniformLocation;
  public hasDiffuseTexture: WebGLUniformLocation;

  private positionAttribute: number;
  private textureCoordsAttribute: number;
  private normalAttribute: number;
  private program: WebGLProgram;
  private transformationMatrix: WebGLUniformLocation;
  private viewMatrix: WebGLUniformLocation;
  private projectionMatrix: WebGLUniformLocation;
  private lightPosition: WebGLUniformLocation;
  private lightColor: WebGLUniformLocation;
  private lightAmbient: WebGLUniformLocation;
  private gl: GLCommander;

  constructor(gl: GLCommander) {
    this.gl = gl;
    const vertexShader = this.gl.createVertexShader()!;
    this.gl.addShaderSource(vertexShader, VertexSource);
    this.gl.compileShader(vertexShader);
    this.compileStatus(vertexShader);

    const fragmentShader = this.gl.createFragmentShader()!;
    this.gl.addShaderSource(fragmentShader, FragmentSource);
    this.gl.compileShader(fragmentShader);
    this.compileStatus(fragmentShader);

    const program = this.gl.createShaderProgram()!;
    this.gl.attachShaderToProgram(program, vertexShader);
    this.gl.attachShaderToProgram(program, fragmentShader);
    this.gl.linkProgram(program);

    this.positionAttribute = this.gl.getAttribLocation(
      program,
      Locations.POSITION
    );
    this.textureCoordsAttribute = this.gl.getAttribLocation(
      program,
      Locations.TEXTURE_COORDS
    );
    this.normalAttribute = this.gl.getAttribLocation(program, Locations.NORMAL);
    this.transformationMatrix = this.gl.getUniformLocation(
      program,
      Locations.TRANSFORMATION_MATRIX
    )!;
    this.viewMatrix = this.gl.getUniformLocation(
      program,
      Locations.VIEW_MATRIX
    )!;
    this.projectionMatrix = this.gl.getUniformLocation(
      program,
      Locations.PROJECTION_MATRIX
    )!;
    this.lightPosition = this.gl.getUniformLocation(
      program,
      Locations.LIGHT_POSITION
    )!;
    this.lightColor = this.gl.getUniformLocation(
      program,
      Locations.LIGHT_COLOR
    )!;
    this.lightAmbient = this.gl.getUniformLocation(
      program,
      Locations.LIGHT_AMBIENT
    )!;
    this.diffuseTexture = this.gl.getUniformLocation(
      program,
      Locations.DIFFUSE_TEXTURE
    )!;
    this.hasDiffuseTexture = this.gl.getUniformLocation(
      program,
      Locations.HAS_DIFFUSE_TEXTURE
    )!;
    this.program = program;
  }

  public compileStatus = (shader: WebGLShader) => {
    if (!this.gl.gl.getShaderParameter(shader, this.gl.gl.COMPILE_STATUS)) {
      console.error(this.gl.gl.getShaderInfoLog(shader));
    }
  };

  public use() {
    this.gl.useProgram(this.program);
  }

  public enablePosition() {
    this.gl.enableVertexAttribArray(this.positionAttribute);
    this.gl.pointToAttribute(this.positionAttribute, 3);
  }

  public enableTextureCoords() {
    this.gl.enableVertexAttribArray(this.textureCoordsAttribute);
    this.gl.pointToAttribute(this.textureCoordsAttribute, 2);
  }

  public enableNormals() {
    this.gl.enableVertexAttribArray(this.normalAttribute);
    this.gl.pointToAttribute(this.normalAttribute, 3);
  }

  public enableLight(light: Light) {
    this.gl.uploadVec3f(this.lightPosition, light.getPosition());
    this.gl.uploadVec3f(this.lightColor, light.getColor());
    this.gl.uploadFloat(this.lightAmbient, light.getAmbient());
  }

  public enableTransformationMatrix(matrix: Float32List) {
    this.gl.uploadMatrix4fv(this.transformationMatrix, matrix);
  }

  public enableViewProjectionMatrices(
    viewMatrix: mat4,
    projectionMatrix: mat4
  ) {
    this.gl.uploadMatrix4fv(this.viewMatrix, viewMatrix);
    this.gl.uploadMatrix4fv(this.projectionMatrix, projectionMatrix);
  }
}
