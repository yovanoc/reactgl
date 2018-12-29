import * as React from "react";
import { useWebGL, WebGLRenderFunction } from "../hooks/useWebGL";

export interface IWebGLProps {
  draw: WebGLRenderFunction;
  width?: number;
  height?: number;
}

export const WebGL: React.FunctionComponent<IWebGLProps> = props => {
  const cRef = React.useRef<HTMLCanvasElement>(null);

  useWebGL(cRef, props.draw);

  return <canvas ref={cRef} width={props.width} height={props.height} />;
};
