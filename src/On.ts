import { Component } from "./Component";
import { Pin } from "./Pin";

export class On extends Component {
  outPin: Pin;

  constructor() {
    super();
    this.outPin = new Pin(true, this);
  }
}
