<script lang="ts">
  import { Application, Graphics } from "pixi.js";
  import { ww, wh } from "./old2/globals";
  import { ComponentDisplay } from "./ComponentDisplay";
  import { createLvlIn, createNand } from "./components";
  import { gCableDrawer, gMouseManager } from "./globals";

  let app = new Application({
    width: ww,
    height: wh,
    background: "purple",
    antialias: true,
  });
  let graphics = new Graphics();
  app.stage.addChild(graphics);
  //@ts-ignore
  document.body.appendChild(app.view);

  /*   let test = createAnd();
  uSetPinState(test.inPins[0], true);
  uSetPinState(test.inPins[1], true);
  console.log(test);
  console.log(testNand());
  console.log(testNot());
  console.log(testAnd()); */

  let nand = createNand();
  let nand2 = createNand();

  nand.outPins[0].connectPin(nand2.inPins[0]);
  nand.outPins[0].connectPin(nand2.inPins[1]);
  let a = new ComponentDisplay(nand2, app.stage, graphics);

  let b = createLvlIn();
  let c = new ComponentDisplay(b, app.stage, graphics);

  let e = new ComponentDisplay(nand, app.stage, graphics);
  app.ticker.add(() => {
    graphics.clear();
    graphics.lineStyle(2, "white");
    if (gCableDrawer.firstPin) {
      graphics.moveTo(
        gCableDrawer.firstPin.graphics.pos.x,
        gCableDrawer.firstPin.graphics.pos.y
      );
      graphics.lineTo(gMouseManager.mouseX, gMouseManager.mouseY);
    }
    a.update();
    e.update();
    c.update();
  });
</script>
