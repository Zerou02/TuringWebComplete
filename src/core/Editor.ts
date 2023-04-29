import type { Container, Graphics, Ticker } from "pixi.js";
import { Display } from "../graphics/Display";
import { SaveLoader } from "./SaveLoader";
import { gCableDrawer, gMouseManager } from "../utils/globals";
import type { Component } from "./Component";
import type { Save } from "../utils/types";

export class Editor {
  stage: Container;
  ticker: Ticker;
  graphics: Graphics;
  displays: Display[] = [];
  saveLoader: SaveLoader;
  comps: Component[] = [];
  constructor(stage: Container, ticker: Ticker, graphics: Graphics) {
    this.stage = stage;
    this.ticker = ticker;
    this.graphics = graphics;
    this.saveLoader = new SaveLoader();

    this.ticker.add((delta) => {
      graphics.clear();
      graphics.lineStyle(2, "black");
      this.displays.forEach((x) => {
        x.graphicsUpdate();
      });
      if (gCableDrawer.isCableDrawn && gCableDrawer.firstPin) {
        let { x, y } = gCableDrawer.firstPin.position;
        graphics.moveTo(x, y);
        graphics.lineTo(gMouseManager.mouseX, gMouseManager.mouseY);
      }
    });
  }

  load(save: Save) {
    console.log("sdsafa", JSON.stringify(save));

    this.addComponent(this.saveLoader.load(save));
  }

  addComponent(comp: Component) {
    this.comps.push(comp);
    this.displays.push(new Display(comp, this.stage, this.graphics));
  }

  clear() {
    this.stage.removeChildren();
    this.comps = [];
    this.displays = [];
  }

  save(name: string) {
    return this.saveLoader.saveComponent(name, this.comps);
  }
}
