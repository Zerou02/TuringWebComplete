import { Sprite, type Container } from "pixi.js";
import type { Pin } from "../core/Pin";
import { pinSize } from "../utils/globals";
import { getBtnTx } from "../utils/utils";

export class PinDspl {
  pin: Pin;
  parent: Container;
  sprite: Sprite;
  constructor(pin: Pin, parent: Container) {
    this.pin = pin;
    this.parent = parent;
    this.createDspl();
  }

  createDspl() {
    this.sprite = Sprite.from(getBtnTx(this.pin));
    this.sprite.width = pinSize;
    this.sprite.height = pinSize;
    this.parent.addChild(this.sprite);
  }
}
