import type { Pin } from "../core/Pin";
import { v4 as uuidv4 } from "uuid";
import { onBtnTx, offBtnTx } from "./globals";
import type { Container } from "pixi.js";

export const firstLetterToUpper = (str: string) => {
  let a = str.slice(0, 1).toUpperCase();
  let b = str.slice(1, str.length);
  return a + b;
};

export const firstLetterToLower = (str: string) => {
  let a = str.slice(0, 1).toLowerCase();
  let b = str.slice(1, str.length);
  return a + b;
};

export const assignID = () => {
  return uuidv4();
};

export const getBtnTx = (pin: Pin) => {
  return pin.state ? onBtnTx : offBtnTx;
};

export const areArraysEqual = (arr1: boolean[], arr2: boolean[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let isEqual = true;
  arr1.forEach((x, i) => {
    if (x !== arr2[i]) {
      isEqual = false;
    }
  });
  return isEqual;
};

export const removeSpecificChildFromContainer = (
  container: Container,
  child: Container
) => {
  container.removeChildAt(container.getChildIndex(child));
};
