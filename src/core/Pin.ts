import type { Coordinate2 } from "../utils/types";
import { assignID } from "../utils/utils";
import type { Component } from "./Component";

export class Pin {
  type: "In" | "Out";
  name: string | number;
  state: boolean;
  id: number;
  component: Component;
  position: Coordinate2;
  connectedNodes: Pin[] = [];

  toggleable: boolean;
  clickable: boolean;
  constructor(
    state: boolean,
    type: "In" | "Out",
    name: string | number,
    component: Component,
    toggleable = false,
    clickable = true
  ) {
    this.name = name;
    this.state = state;
    this.component = component;
    this.type = type;
    this.position = { x: 0, y: 0 };
    this.id = assignID();
    this.toggleable = toggleable;
    this.clickable = clickable;
  }

  setState(val: boolean) {
    if (this.state !== val) {
      this.state = val;
      this.component.onPinUpdate();
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

  connectToPin(otherPin: Pin) {
    if (this.type === otherPin.type) {
      return;
    }
    this.connectedNodes.push(otherPin);
    otherPin.connectedNodes.push(this);
    if (otherPin.type === "In") {
      otherPin.setState(this.state);
    }
    if (otherPin.type === "Out") {
      this.setState(otherPin.state);
    }
  }
}
