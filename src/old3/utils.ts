import { v4 as uuidv4 } from "uuid";
import type { GraphicsData } from "./types";

export const assignID = (): string => {
  return uuidv4();
};

export const createDefaultGraphics = (): GraphicsData => {
  return {
    pos: { x: 0, y: 0 },
    size: { x: 0, y: 0 },
  };
};
