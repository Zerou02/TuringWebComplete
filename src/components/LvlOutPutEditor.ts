import { Component } from "../core/Component";
import { Pin } from "../core/Pin";

export class LvlOutPutEditor extends Component {
  constructor() {
    super("lvlOut");
    this.inNodes.push(new Pin(false, "In", 0, this));
    this.outNodes.push(new Pin(false, "Out", 0, this, false, false));
  }

  calcNewOutVals(): boolean[] {
    return [this.inNodes[0].state];
  }
}
