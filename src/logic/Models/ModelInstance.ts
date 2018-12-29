import { mat4 } from "gl-matrix";
import { createTransformationMatrix } from "../utils/maths";

export default class ModelInstance {
  private mTransformationMatrix: mat4 | undefined;

  constructor(
    private x: number,
    private y: number,
    private z: number,
    private rx: number,
    private ry: number,
    private rz: number,
    private scale: number
  ) {}

  get transformationMatrix() {
    return this.mTransformationMatrix;
  }

  public updateRotation = (rx: number, ry: number, rz: number) => {
    this.rx += rx;
    this.ry += ry;
    this.rz += rz;
    this.updateTransformationMatrix();
  };

  private updateTransformationMatrix = () =>
    (this.mTransformationMatrix = createTransformationMatrix(
      this.x,
      this.y,
      this.z,
      this.rx,
      this.ry,
      this.rz,
      this.scale
    ));
}
