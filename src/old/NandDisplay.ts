import type { Container } from "pixi.js";
import { ComponentDisplay } from "../ComponentDisplay";
import type { Nand } from "../Nand";

export class NandDisplay extends ComponentDisplay {
  constructor(component: Nand, stage: Container) {
    super(component, stage, "nand");
  }
}
