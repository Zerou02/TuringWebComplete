import type { Pin } from "./Pin";

export class CableDrawer {
  isCableDrawn = false;
  firstPin: Pin;
  constructor() {
    window.addEventListener("mouseup", (e) => {
      this.isCableDrawn = false;
      this.firstPin = null;
    });
  }
}
