import type { Component } from "../core/Component";
import { SaveLoader } from "../core/SaveLoader";
import type { ComponentTypes } from "../utils/types";
import { InGate } from "./InGate";
import { LvlInput } from "./LvlInput";
import { LvlOut } from "./LvlOutPut";
import { Nand } from "./Nand";

export const getComponent = (type: ComponentTypes): Component => {
  switch (type) {
    case "nand":
      return new Nand();
    case "inGate":
      return new InGate();
    case "lvlIn":
      return new LvlInput();
    case "lvlOut":
      return new LvlOut();
  }
};
