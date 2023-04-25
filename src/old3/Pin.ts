import type { Connection } from "./Connections";
import type {
  ComponentType,
  GraphicsData,
  OpType,
  PinDirection,
} from "./types";
import { assignID, createDefaultGraphics } from "./utils";

export class Pin {
  id: string;
  type: ComponentType;
  value: boolean;
  connections: Connection[];
  opType: OpType;
  graphics: GraphicsData;
  direction: PinDirection;

  constructor(opType: OpType, value: boolean, direction: PinDirection) {
    this.type = "pin";
    this.id = assignID();
    this.value = value;
    this.opType = opType;
    this.direction = direction;
    this.graphics = createDefaultGraphics();
  }

  eval() {
    switch (this.opType) {
      case "nand":
        return !(
          this.connections[0].other.value && this.connections[1].other.value
        );
      case "through":
        let hasOn = false;
        this.inEdges.forEach((x) => {
          if (x.value === true) {
            hasOn = true;
          }
        });
        return hasOn;
    }
  }

  uEval() {
    let oldVal = this.value;
    let newVal = this.eval();
    this.value = newVal;
    if (oldVal !== newVal) {
      this.outEdges.forEach((x) => x.uEval());
    }
    return newVal;
  }

  setPinState(val: boolean) {
    let oldVal = this.value;
    this.value = val;
    if (oldVal !== val) {
      this.outEdges.forEach((x) => {
        x.uEval();
      });
    }
  }

  connectPin(destPin: Pin) {
    uCreateEdge(this, destPin);
    destPin.uEval();
  }

  removeInPins() {
    this.inEdges = [];
  }

  removeOutPins() {
    this.outEdges = [];
  }

  removePin = (pin: Pin) => {
    console.log("Acd");

    let index = this.inEdges.findIndex((x) => x.id === pin.id);
    if (index === -1) {
      console.log("2");

      index = this.outEdges.findIndex((x) => x.id === pin.id);
      console.log("dad", index);

      if (index !== -1) {
        this.outEdges.splice(index, 1);
      }
    } else {
      this.inEdges.splice(index, 1);
    }
  };
}
