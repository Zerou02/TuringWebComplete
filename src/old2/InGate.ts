import { Component } from "./Component";
import { Pin } from "./Pin";

export class InGate extends Component {
    constructor() {
        super()
        this.outNodes.push(new Pin(true, "Out", 0, this))
    }
}