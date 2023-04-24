import type { ComponentDisplay } from "./ComponentDisplay";
import type { Pin } from "./Pin";
import type { Coordinate2 } from "./types";
import { assignID } from "./utils";

export class Component {
  inNodes: Pin[] = [];
  outNodes: Pin[] = [];

  position: Coordinate2 = { x: 0, y: 0 };
  id: number;

  display: ComponentDisplay;

  constructor() {
    this.id = assignID();
  }

  evalOutNode() {
    //  console.error("Abstract");
  }

  onPinUpdate(pin: Pin): void {
    this.evalOutNode();
    if (this.display) this.display.update();
  }

  uSetPinState(pinType: "in" | "out", pinName: number, val: boolean) {
    this[pinType + "Nodes"][pinName].setState(val);
    this.display.update();
  }

  connectToPin(selfPin: Pin, otherPin: Pin) {
    if (selfPin.type === otherPin.type) {
      return;
    }
    selfPin.connectedNodes.push(otherPin);
    otherPin.connectedNodes.push(selfPin);
    if (otherPin.type === "In") {
      otherPin.setState(selfPin.state);
    }
    if (otherPin.type === "Out") {
      selfPin.setState(otherPin.state);
    }
  }
}
