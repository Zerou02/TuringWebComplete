import type { Display } from "../graphics/Display";
import type { Coordinate2, ComponentTypes } from "../utils/types";
import { assignID, areArraysEqual } from "../utils/utils";
import type { Pin } from "./Pin";

export class Component {
  inNodes: Pin[] = [];
  outNodes: Pin[] = [];

  position: Coordinate2 = { x: 0, y: 0 };
  id: number;
  type: ComponentTypes;
  name: string;
  display: Display;
  topLevelComponent: Component;

  constructor(type: ComponentTypes) {
    this.id = assignID();
    this.type = type;
    this.topLevelComponent = this;
    if (type !== "custom") {
      this.name = type;
    }
  }

  calcNewOutVals(): boolean[] {
    console.error("Abstract new out vals");
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

  onPinUpdate(): void {
    this.uEval();
  }

  uSetPinState(pinType: "in" | "out", pinName: number, val: boolean) {
    this[pinType + "Nodes"][pinName].setState(val);
    this.display.update();
  }

  removeAllConnections() {
    this.inNodes.forEach((y) => y.removeAllConnections());
    this.outNodes.forEach((x) => x.removeAllConnections());
  }
}
