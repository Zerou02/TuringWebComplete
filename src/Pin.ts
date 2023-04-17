import type { Component } from "./Component";

export class Pin {
  state: boolean;
  component: Component;

  constructor(state: boolean, component: Component) {
    this.state = state;
    this.component = component;
  }

  setState(val: boolean) {
    if (this.state !== val) {
      this.state = val;
      this.component.onPinUpdate(this);
    }
  }
}
