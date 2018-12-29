import { mat4, vec3 } from "gl-matrix";
import MouseListener from "../EventHandlers/Mouse";
import { GLCommander } from "../GLCommander";
import ModelShader from "../Shaders/ModelShader";
import { toRadians } from "../utils/maths";

export default class Camera {
  public viewMatrix!: mat4;
  public projectionMatrix!: mat4;

  constructor(
    private x = 0,
    private y = 0,
    private z = 3,
    private pitch = 0,
    private yaw = 0,
    private roll = 0,
    private near = 0.1,
    private far = 1000,
    private fov = 40,
    private glc: GLCommander
  ) {
    this.generateMatrices();
    const mouseEvent = new MouseListener(this.glc);
    mouseEvent.init();
    mouseEvent.subscribeToDrag(this);
    mouseEvent.subscribeToWheel(this);
  }

  public onDrag = (dx: number, dy: number) => {
    this.x += dx * 0.01;
    this.y -= dy * 0.01;
    this.generateMatrices();
  };

  public onWheel = (ev: WheelEvent) => {
    this.z += ev.deltaY * 0.01;
    this.generateMatrices();
  };

  public enable = (shader: ModelShader) => {
    shader.enableViewProjectionMatrices(this.viewMatrix, this.projectionMatrix);
  };

  private generateMatrices = () => {
    this.viewMatrix = this.createViewMatrix();
    this.projectionMatrix = this.createProjectionMatrix();
  };

  private createViewMatrix = () => {
    const matrix = mat4.create();
    mat4.identity(matrix);
    mat4.rotateX(matrix, matrix, toRadians(this.pitch));
    mat4.rotateY(matrix, matrix, toRadians(this.yaw));
    mat4.rotateZ(matrix, matrix, toRadians(this.roll));
    mat4.translate(matrix, matrix, vec3.fromValues(-this.x, -this.y, -this.z));
    return matrix;
  };

  private createProjectionMatrix = () => {
    const aspectRatio = this.glc.gl.canvas.width / this.glc.gl.canvas.height;
    const matrix = mat4.create();
    mat4.perspective(
      matrix,
      toRadians(this.fov),
      aspectRatio,
      this.near,
      this.far
    );
    return matrix;
  };
}
