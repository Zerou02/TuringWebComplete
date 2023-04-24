import type { Pin } from "./Pin";
import type { Edge } from "./types";

export const createEdge = (pin1: Pin, pin2: Pin): Edge => {
  return [pin1, pin2];
};

export const uCreateEdge = (pin1: Pin, pin2: Pin) => {
  //let edge = createEdge(pin1, pin2);
  pin1.outEdges.push(pin2);
  pin2.inEdges.push(pin1);
};
