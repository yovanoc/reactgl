import { GLCommander } from "../GLCommander";

export default class Texture {
  public done: boolean = false;

  private texture: WebGLTexture;

  constructor(private gl: GLCommander) {
    this.texture = this.gl.createTexture()!;
    this.gl.bindTexture(this.texture);
    this.gl.defineDummyTexture();
  }

  public loadTexture = (url: string) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "");
    img.onload = this.onLoad(img);
    img.src = url;
  };

  public enable = () => this.gl.bindTexture(this.texture);
  public hasTexture = () => this.done;

  private onLoad = (img: HTMLImageElement) => (ev: Event) => {
    this.gl.bindTexture(this.texture);
    this.gl.defineTexture(img);
    if (this.isPowerOf2(img.width) && this.isPowerOf2(img.height)) {
      this.gl.texturePowerOfTwo();
    } else {
      this.gl.textureNoPowerOfTwo();
    }
    this.done = true;
  };

  private isPowerOf2 = (side: number) => (side & (side - 1)) === 0;
}
