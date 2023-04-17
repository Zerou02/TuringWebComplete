import { Component } from "./Component";
import type { NandDisplay } from "./NandDisplay";
import { Pin } from "./Pin";

export class Nand extends Component {
  in1: Pin;
  in2: Pin;
  out: Pin;
  display: NandDisplay;
  connectedIns: Pin[];

  constructor() {
    super();
    this.in1 = new Pin(false, this);
    this.in2 = new Pin(false, this);
    this.out = new Pin(true, this);
    this.connectedIns = [];
  }

  evalOutNode() {
    let prevState = this.out.state;
    let newState = !(this.in1.state && this.in2.state);
    if (prevState != newState) {
      this.out.setState(newState);
      this.connectedIns.forEach((x) => {
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

  connectPin(pin: Pin) {
    pin.setState(this.out.state);
    this.connectedIns.push(pin);
  }

  onPinUpdate(pin: Pin): void {
    this.evalOutNode();
    if (this.display) this.display.update();
  }
}
