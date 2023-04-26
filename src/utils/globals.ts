import { Texture } from "pixi.js";
import { CableDrawer } from "../core/CableDrawer";
import { MouseManager } from "../core/MouseManager";

export const ww = 800;
export const wh = 600;
export const pinSize = 32;
export const gAssetsPath = "turing/";
export const gSavePath = gAssetsPath + "components/";
export const gCableDrawer = new CableDrawer();
export const gMouseManager = new MouseManager();
export const leftButton = 0;
export const middleBtn = 1;
export const rightButton = 2;

export const offBtnTx = Texture.from(gAssetsPath + "pin_off.png");
export const onBtnTx = Texture.from(gAssetsPath + "pin_on.png");
