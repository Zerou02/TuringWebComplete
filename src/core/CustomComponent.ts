import { Component } from "./Component";

export class CustomComponent extends Component {
  comps: Component[] = [];

  constructor(name: string) {
    super("custom");
    this.name = name;
  }

  addComponent(component: Component) {
    if (component.type === "lvlIn") {
      this.inNodes.push(component.inNodes[0]);
    } else if (component.type === "lvlOut") {
      this.outNodes.push(component.outNodes[0]);
    }
    this.comps.push(component);
  }
}
