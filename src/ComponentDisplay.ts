import { Point, Container, Sprite, Graphics } from "pixi.js";
import type { Vec2 } from "./types";
import { gAssetsPath, pinSize } from "./globals";
import { Vector2 } from "./Vector2";
import type { Component } from "./Component";
import { PinDisplay } from "./PinDisplay";

export class ComponentDisplay {
  component: Component;
  componentContainer: Container;
  stage: Container;

  bodySprite: Sprite;
  inPinSprites: PinDisplay[] = [];
  outPinSprites: PinDisplay[] = [];

  isDragging = false;
  dragOffset: Vec2;

  allowManualPinChange = false;

  graphics: Graphics;
  constructor(
    component: Component,
    stage: Container,
    graphics: Graphics,
    allowManualPinChange = false
  ) {
    this.component = component;
    this.stage = stage;
    this.allowManualPinChange = allowManualPinChange;
    this.graphics = graphics;
    this.createDisplay();
    this.setPositions();
    this.createEventListeners();
  }

  createDisplay() {
    this.componentContainer = new Container();
    this.bodySprite = Sprite.from(gAssetsPath + this.component.type + ".png");
    this.bodySprite.width = pinSize * 2;
    this.bodySprite.height = pinSize * 2;
    this.bodySprite.x = pinSize / 2;

    this.component.inPins.forEach((x, i) => {
      let pinSprite = new PinDisplay(x, this.componentContainer);
      pinSprite.pinSprite.y = pinSize * i;
      this.inPinSprites.push(pinSprite);
    });
    this.component.outPins.forEach((x, i) => {
      let pinSprite = new PinDisplay(x, this.componentContainer);
      pinSprite.pinSprite.y = (pinSize / 2) * (i + 1);
      pinSprite.pinSprite.x = pinSize * 2 * (i + 1);
      this.inPinSprites.push(pinSprite);
      this.outPinSprites.push(pinSprite);
    });
    this.componentContainer.addChild(this.bodySprite);
    this.stage.addChild(this.componentContainer);
  }

  setPositions() {
    let glPos = this.componentContainer.toGlobal(new Point(0, 0));

    console.log(glPos);

    this.component.outPins.forEach((a, i) => {
      let { x, y } = this.outPinSprites[i].pinSprite;
      a.graphics.pos = {
        x: x + glPos.x + pinSize / 2,
        y: y + glPos.y + pinSize / 2,
      };
    });

    this.component.inPins.forEach((a, i) => {
      let { x, y } = this.inPinSprites[i].pinSprite;
      a.graphics.pos = {
        x: x + glPos.x + pinSize / 2,
        y: y + glPos.y + pinSize / 2,
      };
    });

    let { x, y } = this.bodySprite;
    this.component.graphics.pos = {
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

    /*  

    this.inPinSprites.forEach((x, i) => {
      x.interactive = true;
      x.on("pointerdown", (e) => {
        if (e.button === leftButton) {
          gCableDrawer.isCableDrawn = true;
          gCableDrawer.firstPin = this.component.inPins[i];
        } else if (e.button === rightButton) {
          gCableDrawer.isCableDrawn = false;
          gCableDrawer.firstPin = null;
          this.component.inPins[i].connectedNodes.forEach((y) => {
            y.removePin(this.component.inPins[i]);
          });
          this.component.inNodes[i].setState(false);
          this.component.inNodes[i].connectedNodes = [];
        }
      });
      x.on("pointerup", (e) => {
        if (e.button === leftButton) {
          this.component.connectToPin(
            this.component.inNodes[i],
            gCableDrawer.firstPin
          );
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
          this.component.connectToPin(
            this.component.outNodes[i],
            gCableDrawer.firstPin
          );
        }
        gCableDrawer.firstPin = null;
      });
    }); */
  }

  update() {
    this.inPinSprites.forEach((x, i) => {
      x.update();
    });
    this.outPinSprites.forEach((x, i) => {
      x.update();
    });

    this.component.inPins.forEach((x) => {
      x.inEdges.forEach((y) => {
        this.graphics.moveTo(x.graphics.pos.x, x.graphics.pos.y);
        this.graphics.lineTo(y.graphics.pos.x, y.graphics.pos.y);
      });
    });
    this.component.outPins.forEach((x) => {
      x.outEdges.forEach((y) => {
        this.graphics.moveTo(x.graphics.pos.x, x.graphics.pos.y);
        this.graphics.lineTo(y.graphics.pos.x, y.graphics.pos.y);
      });
    });
  }
}
