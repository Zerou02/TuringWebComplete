import { Component } from "./Component";
import { uCreateEdge } from "./Edges";
import { Pin } from "./Pin";

export const createNand = (): Component => {
  let nin1 = new Pin("through", false);
  let nin2 = new Pin("through", false);
  let nout1 = new Pin("nand", true);
  let edge1 = uCreateEdge(nin1, nout1);
  let edge2 = uCreateEdge(nin2, nout1);
  let nand = new Component([], [nin1, nin2], [nout1], "nand", null);
  return nand;
};

export const createLvlIn = (): Component => {
  let out = new Pin("through", true);
  return new Component([], [], [out], "lvlIn", null);
};

/* export const createNotGate = (): Component => {
  let nand = createNand();
  let notIn1 = createPin("through", false);
  let notOut2 = createPin("through", true);
  let a = uCreateEdge(notIn1, nand.inPins[0]);
  let b = uCreateEdge(notIn1, nand.inPins[1]);
  let c = uCreateEdge(nand.outPins[0], notOut2);
  console.log("edge", c);

  return {
    type: "not",
    inPins: [notIn1],
    outPins: [notOut2],
    components: [nand],
    edges: [a, b, c],
    graphics: createDefaultGraphics(),
  };
};

export const createAnd = (): Component => {
  let nand = createNand();
  let not = createNotGate();
  let ain1 = createPin("through", false);
  let ain2 = createPin("through", false);
  let aout = createPin("through", false);
  let a = uCreateEdge(ain1, nand.inPins[0]);
  let b = uCreateEdge(ain2, nand.inPins[1]);
  let d = uCreateEdge(nand.outPins[0], not.inPins[0]);
  let c = uCreateEdge(not.outPins[0], aout);
  return {
    type: "and",
    inPins: [ain1, ain2],
    outPins: [aout],
    components: [nand, not],
    edges: [a, b, d, c],
    graphics: createDefaultGraphics(),
  };
}; */

/* export const createOr = (): Component => {
  let in1 = createPin("through", false);
  let in2 = createPin("through", false);
  let out = createPin("through", false);
  let not1 = createNotGate();
  let not2 = createNotGate();
  let nand = createNand();
  return {
    type: "or",
    pins: [in1, in2, out],
    components: [not1, not2, nand],
    edges: [
      uCreateEdge(in1, not1.pins[0]),
      uCreateEdge(in2, not2.pins[0]),
      uCreateEdge(not1.pins[1], nand.pins[0]),
      uCreateEdge(not2.pins[1], nand.pins[1]),
      uCreateEdge(nand.pins[2], out),
    ],
    graphics: createDefaultGraphics(),
  };
};
 */
