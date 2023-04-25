import type { Pin } from "./Pin";
import type { ComponentType, GraphicsData } from "./types";
import { createDefaultGraphics } from "./utils";

export class Component {
  components: Component[];
  inPins: Pin[];
  outPins: Pin[];
  graphics: GraphicsData;
  type: ComponentType;
  constructor(
    components: Component[],
    inPins: Pin[],
    outPins: Pin[],
    type: ComponentType,
    graphics: GraphicsData | null
  ) {
    this.components = components;
    this.inPins = inPins;
    this.outPins = outPins;
    this.type = type;
    this.graphics = graphics || createDefaultGraphics();
  }
}
