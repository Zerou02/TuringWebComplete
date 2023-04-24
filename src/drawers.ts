import { Sprite, Texture } from "pixi.js";
import { gAssetsPath, pinSize } from "./globals";
import type { Pin } from "./Pin";

export const getPinTexture = (pin: Pin) => {
  return Texture.from(
    gAssetsPath + "pin" + (pin.value ? "_on" : "_off") + ".png"
  );
};

export const createPinSprite = (pin: Pin) => {
  let pinSprite = Sprite.from(getPinTexture(pin));
  pinSprite.width = pinSize;
  pinSprite.height = pinSize;
  return pinSprite;
};
