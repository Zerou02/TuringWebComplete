import { Sprite, Texture, Container, Point } from "pixi.js";
import type { Nand } from "./Nand";
import { pinSize } from "./globals";
import { offBtnTx, onBtnTx } from "./textures";
import { firstLetterToUpper } from "./utils";
import { Vector2 } from "./Vector2";

export class NandDisplay {
  nand: Nand;
  stage: Container;

  nandContainer: Container;
  nandShell: Sprite;
  pinIn1: Sprite;
  pinIn2: Sprite;
  pinOut: Sprite;

  isDragging = false;
  dragOffset: Vector2;

  constructor(nand: Nand, stage: Container) {
    this.nand = nand;
    this.stage = stage;
    nand.display = this;

    this.createDisplay();
    this.createEventListener();
  }

  _setTexture(pinName: "in1" | "in2" | "out") {
    this["pin" + firstLetterToUpper(pinName)].texture = this._getBtnTx(pinName);
  }

  update() {
    this._setTexture("in1");
    this._setTexture("in2");
    this._setTexture("out");
  }

  _getBtnTx(pin: "in1" | "in2" | "out") {
    return this.nand[pin].state ? onBtnTx : offBtnTx;
  }

  createDisplay() {
    this.nandContainer = new Container();
    this.nandShell = Sprite.from("turing/nand.png");
    this.pinIn1 = Sprite.from(this._getBtnTx("in1"));
    this.pinIn2 = Sprite.from(this._getBtnTx("in2"));
    this.pinOut = Sprite.from(this._getBtnTx("out"));

    this.nandContainer.addChild(
      this.pinIn1,
      this.pinIn2,
      this.pinOut,
      this.nandShell
    );
    this.pinIn1.width = pinSize;
    this.pinIn1.height = pinSize;
    this.pinIn2.width = pinSize;
    this.pinIn2.height = pinSize;
    this.pinOut.width = pinSize;
    this.pinOut.height = pinSize;
    this.nandShell.width = pinSize * 2;
    this.nandShell.height = pinSize * 2;
    this.pinIn2.position.y = pinSize;
    this.pinOut.y = pinSize / 2;
    this.pinOut.x = pinSize * 2;
    this.nandShell.x = pinSize / 2;
    this.stage.addChild(this.nandContainer);
  }

  dragListener = (e: MouseEvent) => {
    if (this.isDragging) {
      this.nandContainer.x = e.x - this.dragOffset.x;
      this.nandContainer.y = e.y - this.dragOffset.y;
    }
  };
  createEventListener() {
    this.nandShell.interactive = true;
    this.pinIn1.interactive = true;
    this.pinIn2.interactive = true;

    this.nandShell.on("mousedown", (e) => {
      this.isDragging = true;
      let gNcPos = this.nandContainer.toGlobal(new Point(0, 0));
      this.dragOffset = new Vector2(e.x - gNcPos.x, e.y - gNcPos.y);
    });
    document.addEventListener("mousemove", this.dragListener);
    this.nandShell.on("mouseup", (e) => {
      this.isDragging = false;
    });
    this.pinIn1.on("pointerdown", (e) => {
      this.nand.uSetPinState("in1", !this.nand.in1.state);
    });

    this.pinIn2.on("pointerdown", (e) => {
      this.nand.uSetPinState("in2", !this.nand.in2.state);
    });
  }
}
