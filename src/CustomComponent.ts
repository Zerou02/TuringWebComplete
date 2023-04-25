import { LvlInput } from "./LvlInput";
import { Nand } from "./Nand";

export class CustomComponent {
  nand1: Nand;
  nand2: Nand;
  in1: LvlInput;
  constructor() {
    this.nand1 = new Nand();
    this.nand2 = new Nand();
    this.in1 = new LvlInput();

    this.nand1.inNodes[0].connectToPin(this.in1.outNodes[0]);
    this.nand1.inNodes[1].connectToPin(this.in1.outNodes[0]);
  }
}
