import type { Pin } from "./Pin";

export type OpType = "nand" | "through" | "end";
export type ComponentType = "pin" | "nand" | "not" | "and" | "or" | "lvlIn";

/* export interface Pin {
  id: string;
  type: ComponentType;
  value: boolean;
  edges: Edge[];
  opType: OpType;
  graphics: GraphicsData;
}

export interface Component extends Partial<Pin> {
  components: Component[];
  inPins: Pin [];
  outPins: Pin[];
  graphics: GraphicsData;
} */

export type Edge = [Pin, Pin];

export interface Vec2 {
  x: number;
  y: number;
}

export interface GraphicsData {
  pos: Vec2;
  size: Vec2;
}

export type PinDirection = "in" | "out";
