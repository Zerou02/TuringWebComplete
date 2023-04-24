import type { Component } from "./Component";
import type { Coordinate2 } from "./types";
import { assignID } from "./utils";

export class Pin {
  type: "In" | "Out";
  name: string | number;
  state: boolean;
  id: number;
  component: Component;
  position: Coordinate2;
  connectedNodes: Pin[] = [];

  constructor(
    state: boolean,
    type: "In" | "Out",
    name: string | number,
    component: Component
  ) {
    this.name = name;
    this.state = state;
    this.component = component;
    this.type = type;
    this.position = { x: 0, y: 0 };
    this.id = assignID();
  }

  setState(val: boolean) {
    if (this.state !== val) {
      this.state = val;
      this.component.onPinUpdate(this);
    }
  }

  getAmountOnConnections = () => {
    let retVal = 0;
    this.connectedNodes.forEach((x) => {
      if (x.state === true) retVal++;
    });
    return retVal;
  };

  removePin = (pin: Pin) => {
    let index = this.connectedNodes.findIndex((x) => pin.id);
    if (index > -1) {
      this.connectedNodes.splice(index, 1);
    }
  };
}
