import { Component } from "../Component";
import type { NandDisplay } from "./NandDisplay_old";
import { Pin } from "../Pin";
import type { Coordinate2 } from "../types";

export class Nand extends Component {
  in1: Pin;
  in2: Pin;
  out: Pin;

  constructor() {
    super();
    this.in1 = new Pin(false, "In", "in1", this);
    this.in2 = new Pin(false, "In", "in2", this);
    this.out = new Pin(true, "Out", "out", this);
    this.externalIns = [];
    this.position = { x: 0, y: 0 };
  }

  evalOutNode() {
    let prevState = this.out.state;
    let newState = !(this.in1.state && this.in2.state);
    if (prevState != newState) {
      this.out.setState(newState);
      this.externalIns.forEach((x) => {
        console.log("x", x, this.out.state);

        x.setState(this.out.state);
      });
    }
  }

  /**
   * Calced out neu
   */
  uSetPinState(pinName: "in1" | "in2" | "out", val: boolean) {
    this[pinName].setState(val);
    // eval(`this.${pinName}.state = ${val};`);
    this.evalOutNode();
    this.display.update();
  }

  connectToPin(selfPin: "in1" | "in2" | "out", pin: Pin) {
    console.log("Aa", pin, selfPin);

    if (pin.type === "In" && selfPin.includes("in")) {
      return;
    }
    if (pin.type === "Out" && selfPin === "out") {
      return;
    }
    if (pin.type === "In") {
      this.externalIns.push(pin);
      pin.setState(this.out.state);
    }
    if (pin.type === "Out") {
      pin.component.externalIns.push(this[selfPin]);
      this[selfPin].setState(pin.state);
    }
  }

  onPinUpdate(pin: Pin): void {
    this.evalOutNode();
    if (this.display) this.display.update();
  }
}
