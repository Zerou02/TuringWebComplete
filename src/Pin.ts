import { uCreateEdge } from "./Edges";
import type { ComponentType, Edge, GraphicsData, OpType } from "./types";
import { assignID, createDefaultGraphics } from "./utils";

export class Pin {
  id: string;
  type: ComponentType;
  value: boolean;
  inEdges: Pin[];
  outEdges: Pin[];
  opType: OpType;
  graphics: GraphicsData;
  constructor(opType: OpType, value: boolean) {
    this.type = "pin";
    this.id = assignID();
    this.value = value;
    this.inEdges = [];
    this.outEdges = [];
    this.opType = opType;
    this.graphics = createDefaultGraphics();
  }

  /*   getInEdges = () => {
    let retArr: Edge[] = [];
    this.edges.forEach((x) => {
      if (x[1].id === this.id) {
        retArr.push(x);
      }
    });
    return retArr;
  };

  getOutEdges = () => {
    let retArr: Edge[] = [];
    this.edges.forEach((x) => {
      if (x[0].id === this.id) {
        retArr.push(x);
      }
    });
    return retArr;
  }; */

  eval() {
    switch (this.opType) {
      case "nand":
        return !(this.inEdges[0].value && this.inEdges[1].value);
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
}

/* export const createPin = (opType: OpType, value: boolean): Pin => {
  return {
    type: "pin",
    id: assignID(),
    value,
    edges: [],
    opType,
    graphics: {
      pos: { x: 0, y: 0 },
      size: { x: 0, y: 0 },
    },
  };
}; */

/* export const evalPin = (pin: Pin): boolean => {
  switch (pin.opType) {
    case "nand":
      return !(pin.edges[0][0].value && pin.edges[1][0].value);
    case "through":
      let hasOn = false;
      getInEdges(pin).forEach((x) => {
        if (x[0].value === true) {
          hasOn = true;
        }
      });
      return hasOn;
  }
};

export const uEvalPin = (pin: Pin) => {
  let oldVal = pin.value;
  let newVal = evalPin(pin);
  pin.value = newVal;
  if (oldVal !== newVal) {
    getOutEdges(pin).forEach((x) => uEvalPin(x[1]));
  }
  return newVal;
}; */

/* export const uSetPinState = (pin: Pin, val: boolean) => {
  let oldVal = pin.value;
  pin.value = val;
  if (oldVal !== val) {
    pin.edges.forEach((x) => {
      uEvalPin(x[1]);
    });
  }
}; */

/* export const getInEdges = (pin: Pin) => {
  let retArr: Edge[] = [];
  pin.edges.forEach((x) => {
    if (x[1].id === pin.id) {
      retArr.push(x);
    }
  });
  return retArr;
};

export const getOutEdges = (pin: Pin) => {
  let retArr: Edge[] = [];
  pin.edges.forEach((x) => {
    if (x[0].id === pin.id) {
      retArr.push(x);
    }
  });
  return retArr;
};
 */
