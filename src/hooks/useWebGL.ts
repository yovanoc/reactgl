import { RefObject, useEffect } from "react";
import { GLCommander } from "../logic/GLCommander";
import { IReactGL } from "../logic/IReactGL";
import { ReactGL } from "../logic/ReactGL";

export type WebGLRenderFunction = (glc: IReactGL) => void;

export function useWebGL(
  ref: RefObject<HTMLCanvasElement>,
  draw: WebGLRenderFunction
) {
  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      console.error(
        `There is no html canvas available for this ref BLA BLA BLA.`
      );
      return;
    }

    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error(
        `We can't get the webgl context on the canvas with the id BLA BLA BLA`
      );
      return;
    }

    const glc = new GLCommander(gl);
    const reactgl = new ReactGL(glc);

    draw(reactgl);

    // let requestID = 0;

    // const renderIntern = () => {
    //   draw(reactgl);
    //   requestID = window.requestAnimationFrame(renderIntern);
    // };

    // requestID = window.requestAnimationFrame(renderIntern);

    // return () => {
    //   window.cancelAnimationFrame(requestID);
    // };
  }, []);
}
