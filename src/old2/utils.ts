import type { Pin } from "./Pin";
import { offBtnTx, onBtnTx } from "./textures";
import { v4 as uuidv4 } from "uuid";
export const firstLetterToUpper = (str: string) => {
  let a = str.slice(0, 1).toUpperCase();
  let b = str.slice(1, str.length);
  return a + b;
};

export const assignID = () => {
  return uuidv4();
};

export const getBtnTx = (pin: Pin) => {
  return pin.state ? onBtnTx : offBtnTx;
};
