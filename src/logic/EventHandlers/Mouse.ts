import { GLCommander } from "../GLCommander";

export interface IOnWheelListener {
  onWheel: (e: WheelEvent) => void;
}

export interface IOnDragListener {
  onDrag: (dx: number, dy: number) => void;
}

export default class MouseListener {
  private onWheelListeners: IOnWheelListener[];
  private onDragListeners: IOnDragListener[];

  constructor(private glc: GLCommander) {
    this.onWheelListeners = [];
    this.onDragListeners = [];
  }

  public init = () => {
    let x = 0;
    let y = 0;
    let dragging = false;

    this.glc.gl.canvas.onwheel = e => {
      this.onWheelListeners.forEach(listener => {
        listener.onWheel(e);
      });
    };

    this.glc.gl.canvas.onmousedown = e => {
      x = e.clientX;
      y = e.clientY;
      dragging = true;
    };

    this.glc.gl.canvas.onmouseup = () => {
      dragging = false;
    };

    this.glc.gl.canvas.onmousemove = e => {
      if (dragging) {
        const dx = x - e.clientX;
        const dy = y - e.clientY;
        x = e.clientX;
        y = e.clientY;
        this.onDragListeners.forEach(listener => {
          listener.onDrag(dx, dy);
        });
      }
    };
  };

  public subscribeToDrag = (listener: IOnDragListener) => {
    this.onDragListeners.push(listener);
  };

  public subscribeToWheel = (listener: IOnWheelListener) => {
    this.onWheelListeners.push(listener);
  };
}
