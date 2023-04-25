import type { Component } from "./Component";
import { createNand } from "./components";

type cases = boolean[][];
export const testNand = () => {
  let nand = createNand();
  let cases = [
    [false, false, true],
    [true, false, true],
    [false, true, true],
    [true, true, false],
  ];
  return testComponent(nand, cases);
};

/* export const testNot = () => {
  let not = createNotGate();
  let cases = [
    [false, true],
    [true, false],
  ];
  return testComponent(not, cases);
};

export const testAnd = () => {
  let and = createAnd();
  let cases = [
    [false, false, false],
    [false, true, false],
    [true, false, false],
    [true, true, true],
  ];
  return testComponent(and, cases);
}; */

/* export const testOr = () => {
  let or = createOr();
  let cases = [
    [false, false, false],
    [false, true, true],
    [true, false, true],
    [true, true, true],
  ];
  return testComponent(or, cases);
}; */

const testComponent = (component: Component, cases: cases): boolean => {
  let passed = true;
  cases.forEach((test) => {
    let inPinLength = component.inPins.length;
    for (let a = 0; a < inPinLength; a++) {
      component.inPins[a].setPinState;
    }
    for (
      let a = inPinLength - 1, b = 0;
      a < test.length - inPinLength;
      a++, b++
    ) {
      if (component.outPins[b].value !== test[a]) {
        passed = false;
        console.error("Failed", component, test);
      }
    }
  });
  return passed;
};
