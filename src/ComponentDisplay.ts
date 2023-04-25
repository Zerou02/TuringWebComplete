import { Point, Container, Sprite } from "pixi.js";
import type { Component } from "./Component";
import { Vector2 } from "./Vector2";
import {
  gAssetsPath,
  gCableDrawer,
  leftButton,
  middleBtn,
  pinSize,
  rightButton,
} from "./globals";
import { getBtnTx } from "./utils";
import type { ComponentTypes } from "./types";

export class ComponentDisplay {
  component: Component;
  componentContainer: Container;
  stage: Container;
  componentType: ComponentTypes;

  bodySprite: Sprite;
  inPinSprites: Sprite[] = [];
  outPinSprites: Sprite[] = [];

  isDragging = false;
  dragOffset: Vector2;

  allowManualPinChange = false;
  constructor(
    component: Component,
    stage: Container,
    componentType: ComponentTypes,
    allowManualPinChange = false
  ) {
    this.component = component;
    this.stage = stage;
    this.componentType = componentType;
    component.display = this;
    this.allowManualPinChange = allowManualPinChange;
    this.createDisplay();
    this.setPositions();
    this.createEventListeners();
  }

  createDisplay() {
    this.componentContainer = new Container();
    this.bodySprite = Sprite.from(gAssetsPath + this.componentType + ".png");
    this.bodySprite.width = pinSize * 2;
    this.bodySprite.height = pinSize * 2;
    this.bodySprite.x = pinSize / 2;

    this.component.inNodes.forEach((x, i) => {
      let sprite = Sprite.from(getBtnTx(x));
      sprite.width = pinSize;
      sprite.height = pinSize;
      sprite.y = pinSize * i;
      this.inPinSprites.push(sprite);
      this.componentContainer.addChild(sprite);
    });
    this.component.outNodes.forEach((x, i) => {
      let sprite = Sprite.from(getBtnTx(x));
      sprite.width = pinSize;
      sprite.height = pinSize;
      sprite.y = (pinSize / 2) * (i + 1);
      sprite.x = pinSize * 2 * (i + 1);
      this.outPinSprites.push(sprite);
      this.componentContainer.addChild(sprite);
    });

    this.componentContainer.addChild(this.bodySprite);

    this.stage.addChild(this.componentContainer);
  }

  setPositions() {
    let glPos = this.componentContainer.toGlobal(new Point(0, 0));

    this.component.outNodes.forEach((a, i) => {
      let { x, y } = this.outPinSprites[i];
      a.position = {
        x: x + glPos.x + pinSize / 2,
        y: y + glPos.y + pinSize / 2,
      };
    });

    this.component.inNodes.forEach((a, i) => {
      let { x, y } = this.inPinSprites[i];
      a.position = {
        x: x + glPos.x + pinSize / 2,
        y: y + glPos.y + pinSize / 2,
      };
    });

    let { x, y } = this.bodySprite;
    this.component.position = {
      x: x + glPos.x + pinSize / 2,
      y: y + glPos.y + pinSize / 2,
    };
  }

  dragListener = (e: MouseEvent) => {
    if (this.isDragging) {
      this.componentContainer.x = e.x - this.dragOffset.x;
      this.componentContainer.y = e.y - this.dragOffset.y;
      this.setPositions();
    }
  };

  createEventListeners() {
    this.bodySprite.interactive = true;

    document.addEventListener("mousemove", this.dragListener);
    this.bodySprite.on("mousedown", (e) => {
      this.isDragging = true;
      let gNcPos = this.componentContainer.toGlobal(new Point(0, 0));
      this.dragOffset = new Vector2(e.x - gNcPos.x, e.y - gNcPos.y);
    });
    this.bodySprite.on("mouseup", (e) => {
      this.isDragging = false;
    });

    this.inPinSprites.forEach((x, i) => {
      x.interactive = true;
      x.on("pointerdown", (e) => {
        if (e.button === leftButton) {
          gCableDrawer.isCableDrawn = true;
          gCableDrawer.firstPin = this.component.inNodes[i];
        } else if (e.button === rightButton) {
          gCableDrawer.isCableDrawn = false;
          gCableDrawer.firstPin = null;
          this.component.inNodes[i].connectedNodes.forEach((y) => {
            y.removePin(this.component.inNodes[i]);
          });
          this.component.inNodes[i].setState(false);
          this.component.inNodes[i].connectedNodes = [];
        }
      });
      x.on("pointerup", (e) => {
        if (e.button === leftButton) {
          this.component.inNodes[i].connectToPin(gCableDrawer.firstPin);
        }
        gCableDrawer.firstPin = null;
      });
    });

    this.outPinSprites.forEach((x, i) => {
      x.interactive = true;
      x.on("pointerdown", (e) => {
        if (e.button === leftButton) {
          gCableDrawer.isCableDrawn = true;
          gCableDrawer.firstPin = this.component.outNodes[i];
        } else if (e.button === rightButton) {
          gCableDrawer.isCableDrawn = false;
          gCableDrawer.firstPin = null;
          this.component.outNodes[i].connectedNodes.forEach((y) => {
            if (y.getAmountOnConnections() <= 1) {
              y.setState(false);
            }
          });
          this.component.outNodes[i].connectedNodes.forEach((y) => {
            y.removePin(this.component.outNodes[i]);
          });
          this.component.outNodes[i].connectedNodes = [];
        } else if (e.button === middleBtn && this.allowManualPinChange) {
          let newVal = !this.component.outNodes[i].state;
          this.component.outNodes[i].setState(newVal);
          if (newVal === true) {
            this.component.outNodes[i].connectedNodes.forEach((x) =>
              x.setState(true)
            );
          } else {
            this.component.outNodes[i].connectedNodes.forEach((x) => {
              if (x.getAmountOnConnections() <= 1) {
                x.setState(false);
              }
              this.component.outNodes[i].connectedNodes.forEach((y) => {
                y.removePin(this.component.outNodes[i]);
              });
              this.component.outNodes[i].connectedNodes = [];
            });
          }
        }
      });
      x.on("pointerup", (e) => {
        if (e.button === leftButton) {
          this.component.outNodes[i].connectToPin(gCableDrawer.firstPin);
        }
        gCableDrawer.firstPin = null;
      });
    });
  }

  update() {
    this.inPinSprites.forEach((x, i) => {
      x.texture = getBtnTx(this.component.inNodes[i]);
    });
    this.outPinSprites.forEach((x, i) => {
      x.texture = getBtnTx(this.component.outNodes[i]);
    });
  }
}
