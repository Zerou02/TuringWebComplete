export interface Coordinate2 {
  x: number;
  y: number;
}

export type ComponentTypes = "nand" | "inGate" | "lvlIn" | "lvlOut" | "custom";

export interface SaveComp {
  id: string;
  name?: string;
  type: ComponentTypes;
}

export interface SaveCon {
  comp1: string;
  type1: "In" | "Out";
  nr1: number;
  comp2: string;
  type2: "In" | "Out";
  nr2: number;
}
export interface Save {
  name: string;
  comps: SaveComp[];
  cons: SaveCon[];
}
