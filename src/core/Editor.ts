import type { Container, Graphics, Ticker } from "pixi.js";
import { Display } from "../graphics/Display";
import { SaveLoader } from "./SaveLoader";
import { gCableDrawer, gMouseManager } from "../utils/globals";
import type { Component } from "./Component";
import type { Save } from "../utils/types";
import type { StorageManager } from "./StorageManager";
import { removeSpecificChildFromContainer } from "../utils/utils";

export class Editor {
  stage: Container;
  ticker: Ticker;
  graphics: Graphics;
  displays: Display[] = [];
  saveLoader: SaveLoader;
  storageMgr: StorageManager;
  comps: Component[] = [];
  constructor(
    stage: Container,
    ticker: Ticker,
    graphics: Graphics,
    storageMgr: StorageManager
  ) {
    this.stage = stage;
    this.ticker = ticker;
    this.graphics = graphics;
    this.saveLoader = new SaveLoader(storageMgr);
    this.storageMgr = storageMgr;

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
    this.storageMgr.addComponent(
      name,
      this.saveLoader.createSave(name, this.comps)
    );
  }

  removeComponent(component: Component) {
    component.removeAllConnections();
    let displayComp = this.displays.find(
      (x) => x.component.id === component.id
    );
    removeSpecificChildFromContainer(
      this.stage,
      displayComp.componentContainer
    );
    this.displays = this.displays.filter((x) => x.component.id != component.id);
    this.comps = this.comps.filter((x) => x.id !== component.id);
  }
}
