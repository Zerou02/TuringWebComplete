import { Component } from "./Component";
import { Pin } from "./Pin";

export class LvlInput extends Component {
  constructor() {
    super();
    this.outNodes.push(new Pin(false, "Out", 0, this));
  }
}
