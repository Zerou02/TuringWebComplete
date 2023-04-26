import { Component } from "../core/Component";
import { Pin } from "../core/Pin";

export class LvlInput extends Component {
  constructor() {
    super("lvlIn");
    this.outNodes.push(new Pin(false, "Out", 0, this));
    this.inNodes.push(new Pin(false, "In", 0, this));
  }

  calcNewOutVals(): boolean[] {
    return [this.inNodes[0].state];
  }
}
