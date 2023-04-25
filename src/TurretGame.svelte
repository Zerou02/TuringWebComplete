<script lang="ts">
  import * as Pixi from "pixi.js";
  import { wh, ww } from "./globals";
  import { Vector2 } from "./Vector2";

  let turRot = 0;

  let app = new Pixi.Application({
    width: ww,
    height: wh,
    background: "purple",
    antialias: true,
  });
  let turretBase = Pixi.Sprite.from("turret_base.png");
  let turretHead = Pixi.Sprite.from("turret_head.png");
  let laserBall = Pixi.Sprite.from("laser_ball.png");
  laserBall.height = 25;
  laserBall.width = 25;
  let graphics = new Pixi.Graphics();

  turretBase.width = 200;
  turretBase.height = 100;
  turretHead.width = 150;
  turretHead.height = 75;
  turretBase.position.x = ww / 2 - turretBase.width / 2;
  turretBase.position.y = wh - turretBase.height;
  turretHead.position.x = turretBase.position.x + turretHead.width / 1.5;
  turretHead.position.y = turretBase.position.y - turretHead.height;
  turretHead.anchor.set(0.5);

  /*   sprite.interactive = true;
  sprite.on("pointerdown", (e) => {
    sprite.position.x = Math.random() * app.stage.width;
  }); */
  graphics.beginFill("blue");
  graphics.drawCircle(turretHead.x, turretHead.y, 10);

  document.addEventListener("mousemove", (e) => {
    let pb = new Vector2(1, 0);
    let pm = new Vector2(e.x - turretHead.x, e.y - turretHead.y);

    turRot = pm.angleTo(pb);

    if (e.y < turretHead.y) turRot *= -1;
  });

  document.addEventListener("mousedown", (e) => {
    let sprite = Pixi.Sprite.from("laser_ball.png");
    sprite.width = 25;
    sprite.height = 25;
    sprite.x = turretHead.x;
    sprite.y = turretHead.y;
    let vec = new Vector2(e.x - turretHead.x, e.y - turretHead.y);
    vec.uNormalizeSelf();
    sprite.x += vec.x * 75;
    sprite.y += vec.y * 75;
    app.ticker.add(() => {
      if (sprite) {
        sprite.x += vec.x * 10;
        sprite.y += vec.y * 10;
        if (
          sprite.x < -30 ||
          sprite.x > 830 ||
          sprite.y < -30 ||
          sprite.y > 630
        ) {
          sprite.destroy();
          console.log("destroyed");
        }
      }
    });

    app.stage.addChild(sprite);
  });

  let moveVec = new Vector2(1, 1);
  app.ticker.add(() => {
    turretHead.rotation = turRot;
    laserBall.x += moveVec.x;
    laserBall.y += moveVec.y;
  });

  //@ts-ignore
  document.body.append(app.view);
  app.stage.addChild(turretBase, turretHead, graphics, laserBall);
</script>

<main />
