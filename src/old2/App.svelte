<script lang="ts">
  import * as Pixi from "pixi.js";
  import { gAssetsPath, gCableDrawer, gMouseManager, wh, ww } from "./globals";
  import { InGate } from "./InGate";
  import { Nand } from "./Nand";
  import { NandDisplay } from "./old/NandDisplay";
  import { ComponentDisplay } from "./ComponentDisplay";
  import { LvlInput } from "./LvlInput";
  import { LvlOut } from "./LvlOutPut";
  let app = new Pixi.Application({
    width: ww,
    height: wh,
    background: "purple",
    antialias: true,
  });

  let graphics = new Pixi.Graphics();

  let testNand = new Nand();
  let testNand2 = new Nand();
  let testNDspl = new ComponentDisplay(testNand, app.stage, "nand");
  let testNDspl2 = new ComponentDisplay(testNand2, app.stage, "nand");

  testNDspl2.componentContainer.x = 200;
  testNDspl2.setPositions();
  let testIn = new InGate();
  let testInDspl = new ComponentDisplay(testIn, app.stage, "inGate");
  let lvlIn = new LvlInput();
  let lvlOut = new LvlOut();
  let lvlOutDspl = new ComponentDisplay(lvlOut, app.stage, "lvlOut");
  let io1dspl = new ComponentDisplay(lvlIn, app.stage, "lvlIn", true);

  let displays: ComponentDisplay[] = [
    testNDspl,
    testInDspl,
    testNDspl2,
    io1dspl,
    lvlOutDspl,
  ];

  //let a = cycle.decycle(testNDspl);
  //let b = JSON.stringify(a);
  /*   let res = fetch("turing/test");
  res.then((e) => {
    e.json().then((x) => {
      console.log(x);
    });
  }); */
  /* console.log("a:", b);
  let d = JSON.parse(b);
  let c = cycle.retrocycle(d) as NandDisplay;
 */

  // let test = JSON.stringify(instanceToPlain(a));

  // console.log("test,", test);
  // let a = JSON.parse(test);
  // console.log("a", a);

  app.ticker.add((delta) => {
    graphics.clear();
    graphics.lineStyle(2, "black");
    displays.forEach((a) => {
      a.component.outNodes.forEach((b, i) => {
        b.connectedNodes.forEach((c) => {
          let { x, y } = c.position;
          graphics.moveTo(b.position.x, b.position.y);
          graphics.lineTo(x, y);
        });
      });
    });
    if (gCableDrawer.isCableDrawn && gCableDrawer.firstPin) {
      let { x, y } = gCableDrawer.firstPin.position;
      graphics.moveTo(x, y);
      graphics.lineTo(gMouseManager.mouseX, gMouseManager.mouseY);
    }
  });

  app.stage.addChild(graphics);
  //@ts-ignore
  document.body.appendChild(app.view);

  fetch(gAssetsPath + "components/Not.comp").then((val) => {
    val.text().then((x) => {
      console.log(x);
    });
  });
</script>

<button
  style="position: absolute; top:600px"
  on:click={(e) => {
    let nand = new Nand();
    let nandDspl = new NandDisplay(nand, app.stage);
    displays.push(nandDspl);
  }}>Create Nand</button
>
