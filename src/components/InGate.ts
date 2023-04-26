import { Component } from "../core/Component";
import { Pin } from "../core/Pin";

export class InGate extends Component {
  constructor() {
    super("inGate");
    this.outNodes.push(new Pin(true, "Out", 0, this));
  }
}
