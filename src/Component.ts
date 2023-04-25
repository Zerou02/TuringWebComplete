import type { ComponentDisplay } from "./ComponentDisplay";
import type { Pin } from "./Pin";
import type { Coordinate2 } from "./types";
import { areArraysEqual, assignID } from "./utils";

export class Component {
  inNodes: Pin[] = [];
  outNodes: Pin[] = [];

  position: Coordinate2 = { x: 0, y: 0 };
  id: number;

  display: ComponentDisplay;

  constructor() {
    this.id = assignID();
  }

  calcNewOutVals(): boolean[] {
    console.error("Abstract");
    return [];
  }

  getOutState() {
    return this.outNodes.map((x) => x.state);
  }

  uEval() {
    let prevState = this.getOutState();
    let newState = this.calcNewOutVals();

    if (!areArraysEqual(prevState, newState)) {
      this.outNodes.forEach((x, i) => {
        x.setState(newState[i]);
        x.connectedNodes.forEach((y) => y.setState(x.state));
      });
    }
  }

  onPinUpdate(pin: Pin): void {
    this.uEval();
    if (this.display) this.display.update();
  }

  uSetPinState(pinType: "in" | "out", pinName: number, val: boolean) {
    this[pinType + "Nodes"][pinName].setState(val);
    this.display.update();
  }
}
