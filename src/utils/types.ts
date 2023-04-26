export interface Coordinate2 {
  x: number;
  y: number;
}

export type ComponentTypes = "nand" | "inGate" | "lvlIn" | "lvlOut" | string;

export interface SaveComp {
  id: string;
  type: ComponentTypes;
}

export interface SaveCon {
  comp1: ComponentTypes;
  type1: "in" | "out";
  nr1: number;
  comp2: ComponentTypes;
  type2: "in" | "out";
  nr2: number;
}
export interface Save {
  name: string;
  comps: SaveComp[];
  cons: SaveCon[];
}
