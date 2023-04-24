import { Component } from "./Component";
import { Pin } from "./Pin";

export class Nand extends Component {
  constructor() {
    super();
    this.inNodes.push(new Pin(false, "In", 0, this));
    this.inNodes.push(new Pin(false, "In", 1, this));
    this.outNodes.push(new Pin(true, "Out", 0, this));
  }

  evalOutNode() {
    let prevState = this.outNodes[0].state;
    let newState = !(this.inNodes[0].state && this.inNodes[1].state);
    if (prevState != newState) {
      this.outNodes[0].setState(newState);
      this.outNodes.forEach((x) => {
        x.connectedNodes.forEach((y) => y.setState(this.outNodes[0].state));
      });
    }
  }
}
