import { Component } from "../core/Component";
import { Pin } from "../core/Pin";

export class Nand extends Component {
  constructor() {
    super("nand");
    this.inNodes.push(new Pin(false, "In", 0, this));
    this.inNodes.push(new Pin(false, "In", 1, this));
    this.outNodes.push(new Pin(true, "Out", 0, this));
  }

  calcNewOutVals() {
    return [!(this.inNodes[0].state && this.inNodes[1].state)];
  }
}
