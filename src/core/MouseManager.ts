import type { Component } from "./Component";

export class MouseManager {
  mouseX = 0;
  mouseY = 0;

  currentlyHeldComponent: Component;
  constructor() {
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });
  }

  setHeldComponent(display: Component) {
    this.currentlyHeldComponent = display;
  }
}
