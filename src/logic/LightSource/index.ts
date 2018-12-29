import { vec3 } from "gl-matrix";

export default class Light {
  constructor(
    private x: number,
    private y: number,
    private z: number,
    private r: number,
    private g: number,
    private b: number,
    private ambient: number
  ) {}

  public getPosition = () => vec3.fromValues(this.x, this.y, this.z);
  public getColor = () => vec3.fromValues(this.r, this.g, this.b);
  public getAmbient = () => this.ambient;
}
