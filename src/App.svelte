<script lang="ts">
  import * as Pixi from "pixi.js";
  import { pinSize, wh, ww } from "./globals";
  import { Nand } from "./Nand";
  import { NandDisplay } from "./NandDisplay";
  import { serialize, instanceToPlain } from "class-transformer";
  import cycle from "cycle";

  let app = new Pixi.Application({
    width: ww,
    height: wh,
    background: "purple",
    antialias: true,
  });

  let graphics = new Pixi.Graphics();

  let testNand = new Nand();
  let testNand2 = new Nand();
  testNand.connectPin(testNand2.in1);

  let testNandDisplay = new NandDisplay(testNand, app.stage);
  let testNandDisplay2 = new NandDisplay(testNand2, app.stage);
  testNandDisplay2.nandContainer.x = 200;

  // console.log(cycle);
  /*   let a = cycle.decycle(testNandDisplay2);
  let b = JSON.stringify(a);
  console.log("a:", b.length);
  let d = JSON.parse(b);
  let c = cycle.retrocycle(d) as NandDisplay; */

  // let test = JSON.stringify(instanceToPlain(a));

  // console.log("test,", test);
  // let a = JSON.parse(test);
  // console.log("a", a);
  graphics.lineStyle(2, "black");
  app.ticker.add(() => {
    graphics.clear();
    testNand.connectedIns.forEach(x => {
      graphics.moveTo(testNandDisplay.)
    })
  })

  app.stage.addChild(graphics);
  //@ts-ignore
  document.body.appendChild(app.view);
</script>
