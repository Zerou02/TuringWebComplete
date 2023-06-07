import {
  gAssetsPath,
  gCableDrawer,
  gMouseManager,
  leftButton,
  middleBtn,
  pinSize,
  rightButton,
} from "../utils/globals";
import { PinDspl } from "./PinDspl";
import type { Pin } from "../core/Pin";
import {
  Container,
  Graphics,
  Sprite,
  Point,
  Text,
  TextStyle,
  SCALE_MODES,
} from "pixi.js";
import { Vector2 } from "../utils/Vector2";
import type { Component } from "../core/Component";
import { getBtnTx } from "../utils/utils";

export class Display {
  component: Component;
  componentContainer: Container;
  stage: Container;

  graphics: Graphics;

  bodySprite: Sprite;
  inPinSprites: PinDspl[] = [];
  outPinSprites: PinDspl[] = [];

  isDragging = false;
  dragOffset: Vector2;
  constructor(component: Component, stage: Container, graphics: Graphics) {
    this.component = component;
    this.stage = stage;
    this.graphics = graphics;
    component.display = this;

    this.createDisplay();
    this.setPositions();
    this.createEventListeners();
  }

  setPositions() {
    let glPos = this.componentContainer.toGlobal(new Point(0, 0));

    this.component.outNodes.forEach((a, i) => {
      let { x, y } = this.outPinSprites[i].sprite;
      a.position = {
        x: x + glPos.x + pinSize / 2,
        y: y + glPos.y + pinSize / 2,
      };
    });

    this.component.inNodes.forEach((a, i) => {
      let { x, y } = this.inPinSprites[i].sprite;
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

  createDragListener() {
    this.bodySprite.interactive = true;

    document.addEventListener("mousemove", this.dragListener);
    this.bodySprite.on("mousedown", (e) => {
      this.isDragging = true;
      gMouseManager.setHeldComponent(this.component);
      let gNcPos = this.componentContainer.toGlobal(new Point(0, 0));
      this.dragOffset = new Vector2(e.x - gNcPos.x, e.y - gNcPos.y);
    });
    this.bodySprite.on("mouseup", (e) => {
      gMouseManager.currentlyHeldComponent = null;
      this.isDragging = false;
    });
  }

  update() {
    this.inPinSprites.forEach((x, i) => {
      x.sprite.texture = getBtnTx(this.component.inNodes[i]);
    });
    this.outPinSprites.forEach((x, i) => {
      x.sprite.texture = getBtnTx(this.component.outNodes[i]);
    });
  }

  graphicsUpdate() {
    this.update();
    this.component.inNodes.forEach((x) => {
      x.connectedNodes.forEach((y) => {
        this.graphics.moveTo(x.position.x, x.position.y);
        this.graphics.lineTo(y.position.x, y.position.y);
      });
    });
  }

  createDisplay() {
    this.componentContainer = new Container();

    const textSyle = new TextStyle({
      fontSize: 10,
    });
    let text = new Text(this.component.name, textSyle);

    text.y += 2;

    this.bodySprite = Sprite.from(gAssetsPath + "template" + ".png");
    this.bodySprite.width = pinSize * 2;
    this.bodySprite.height = pinSize * 2;
    this.bodySprite.x = pinSize / 2;

    this.component.inNodes.forEach((x, i) => {
      let pinSprite = new PinDspl(x, this.componentContainer);
      pinSprite.sprite.y = pinSize * i;
      this.inPinSprites.push(pinSprite);
    });
    this.component.outNodes.forEach((x, i) => {
      let pinSprite = new PinDspl(x, this.componentContainer);
      pinSprite.sprite.y = (pinSize / 2) * (i + 1);
      pinSprite.sprite.x = pinSize * 2 * (i + 1);
      this.outPinSprites.push(pinSprite);
    });

    this.bodySprite.addChild(text);
    this.componentContainer.addChild(this.bodySprite);

    this.stage.addChild(this.componentContainer);
  }

  pointerUpListener = (e: MouseEvent, pin: Pin) => {
    if (!pin.clickable) return;
    if (e.button === leftButton) {
      pin.connectToPin(gCableDrawer.firstPin);
    }
    gCableDrawer.firstPin = null;
  };

  pointerDownListener = (e: MouseEvent, pin: Pin) => {
    if (e.button === leftButton) {
      if (pin.clickable) {
        gCableDrawer.isCableDrawn = true;
        gCableDrawer.firstPin = pin;
      }
      if (pin.toggleable) {
        let newVal = !pin.state;
        pin.setState(newVal);
        if (newVal === true) {
          pin.connectedNodes.forEach((x) => x.setState(true));
        } else {
          pin.connectedNodes.forEach((x) => {
            if (x.getAmountOnConnections() <= 1) {
              x.setState(false);
            }
          });
        }
      }
    } else if (e.button === rightButton && pin.clickable) {
      gCableDrawer.isCableDrawn = false;
      gCableDrawer.firstPin = null;
      if (pin.type === "Out") {
        pin.connectedNodes.forEach((x) => {
          if (x.getAmountOnConnections() <= 1) {
            x.setState(false);
          }
          pin.connectedNodes.forEach((y) => {
            y.removePin(pin);
          });
          pin.connectedNodes = [];
        });
      } else {
        pin.connectedNodes = [];
        pin.setState(false);
      }
    }
  };

  createEventListeners() {
    this.createDragListener();
    this.inPinSprites.forEach((x, i) => {
      x.sprite.interactive = true;
      x.sprite.on("pointerdown", (e) => this.pointerDownListener(e, x.pin));
      x.sprite.on("pointerup", (e) => this.pointerUpListener(e, x.pin));
    });

    this.outPinSprites.forEach((x, i) => {
      x.sprite.interactive = true;
      x.sprite.on("pointerdown", (e) => this.pointerDownListener(e, x.pin));
      x.sprite.on("pointerup", (e) => this.pointerUpListener(e, x.pin));
    });
  }
}
