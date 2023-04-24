import type { Container } from "pixi.js";
import { ComponentDisplay } from "../ComponentDisplay";
import type { InGate } from "../InGate";

export class InGateDisplay extends ComponentDisplay {
  constructor(inGate: InGate, stage: Container) {
    super(inGate, stage, "inGate");
  }
}
