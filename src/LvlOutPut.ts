import { Component } from "./Component";
import { Pin } from "./Pin";

export class LvlOut extends Component {
  constructor() {
    super();
    this.inNodes.push(new Pin(false, "In", 0, this));
  }
}
