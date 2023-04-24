import { Point, Container } from "pixi.js";
import { ComponentDisplay } from "../ComponentDisplay";
import type { LvlInput } from "../LvlInput";
import { Vector2 } from "../Vector2";
import { gCableDrawer, leftButton, middleBtn, rightButton } from "../globals";

export class LvlIODisplay extends ComponentDisplay {
  constructor(component: LvlInput, stage: Container) {
    super(component, stage, "lvlIn", 0b110);
    this.createEventListeners();
  }

  createEventListeners(): void {
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
        } else if (e.button === middleBtn) {
          this.component.inNodes[i].setState(!this.component.inNodes[i].state);
        }
      });
      x.on("pointerup", (e) => {
        this.component.connectToPin(
          this.component.inNodes[i],
          gCableDrawer.firstPin
        );
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
          this.component.outNodes[i].connectedNodes.forEach((x) => {
            let amountOnConnections = 0;
            x.connectedNodes.forEach((y) => {
              if (y.state === true) {
                amountOnConnections++;
              }
            });
            if (amountOnConnections <= 1) {
              x.setState(false);
            }
          });
          this.component.outNodes[i].connectedNodes = [];
        } else if (e.button === middleBtn) {
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

        gCableDrawer.isCableDrawn = true;
        gCableDrawer.firstPin = this.component.outNodes[i];
      });
      x.on("pointerup", (e) => {
        this.component.connectToPin(
          this.component.outNodes[i],
          gCableDrawer.firstPin
        );
        gCableDrawer.firstPin = null;
      });
    });
  }
}
