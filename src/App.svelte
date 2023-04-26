<script lang="ts">
  import * as Pixi from "pixi.js";
  import { Nand } from "./components/Nand";
  import { ww, wh, gCableDrawer, gMouseManager } from "./utils/globals";
  import { Display } from "./graphics/Display";
  import { SaveLoader } from "./core/SaveLoader";
  import { onMount } from "svelte";

  let app = new Pixi.Application({
    width: ww,
    height: wh,
    background: "purple",
    antialias: true,
  });
  let graphics: Pixi.Graphics;
  let displays: Display[];

  onMount(async () => {
    let saveLoader = new SaveLoader("not");
    await saveLoader.load();

    graphics = new Pixi.Graphics();

    displays = [
      new Display(new Nand(), app.stage, graphics),
      new Display(saveLoader.loadedComponent, app.stage, graphics),
    ];

    app.ticker.add((delta) => {
      graphics.clear();
      graphics.lineStyle(2, "black");
      displays.forEach((a) => {
        a.graphicsUpdate();
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

    window.addEventListener("keydown", (e) => {
      e.key === "d" && console.log("logMsg");
    });
  });
</script>

<button
  style="position: absolute; top:600px"
  on:click={(e) => {
    let nand = new Nand();
    let nandDspl = new Display(nand, app.stage, graphics);
    displays.push(nandDspl);
  }}>Create Nand</button
>
