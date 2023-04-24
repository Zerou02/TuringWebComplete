import type { Pin } from "./Pin";

export class CableDrawer {
  isCableDrawn = false;
  firstPin: Pin;
  constructor() {
    window.addEventListener("mouseup", (e) => {
      console.log("Asss");

      //    this.removePin();
    });
  }

  setPin(pin: Pin) {
    this.firstPin = pin;
  }

  removePin() {
    console.log("rem");
    this.isCableDrawn = false;
    this.firstPin = null;
  }
}
