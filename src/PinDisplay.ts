import type { Container, Sprite } from "pixi.js";
import type { Pin } from "./Pin";
import { createPinSprite, getPinTexture } from "./drawers";
import { leftButton, gCableDrawer, rightButton } from "./globals";

export class PinDisplay {
  pin: Pin;
  container: Container;
  pinSprite: Sprite;
  constructor(pin: Pin, container: Container) {
    this.pin = pin;
    this.container = container;
    this.createDisplay();
    this.addEventListener();
  }

  createDisplay() {
    this.pinSprite = createPinSprite(this.pin);
    this.container.addChild(this.pinSprite);
  }

  addEventListener() {
    this.pinSprite.interactive = true;

    this.pinSprite.on("pointerdown", (e) => {
      if (e.button === leftButton) {
        gCableDrawer.isCableDrawn = true;
        gCableDrawer.setPin(this.pin);
      } else if (e.button === rightButton) {
        gCableDrawer.isCableDrawn = false;
        gCableDrawer.firstPin = null;
        //        this.component.inPins[i].connectedNodes.forEach((y) => {
        //        y.removePin(this.component.inPins[i]);
        //    });
        //        this.component.inNodes[i].setState(false);
        //      this.component.inNodes[i].connectedNodes = [];
      }
    });
    this.pinSprite.on("pointerup", (e) => {
      if (e.button === leftButton) {
        gCableDrawer.firstPin.connectPin(this.pin);
        gCableDrawer.removePin();
      }
    });
  }

  update() {
    this.pinSprite.texture = getPinTexture(this.pin);
  }
}
