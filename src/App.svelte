<script lang="ts">
  import * as Pixi from "pixi.js";
  import { Nand } from "./components/Nand";
  import { ww, wh } from "./utils/globals";
  import { onMount } from "svelte";
  import { Editor } from "./core/Editor";
  import { LvlInputEditor } from "./components/LvlInputEditor";
  import { LvlOutPutEditor } from "./components/LvlOutPutEditor";
  import { StorageManager } from "./core/StorageManager";
  import { getComponent } from "./components/aNotGood";

  let app = new Pixi.Application({
    width: ww,
    height: wh,
    background: "purple",
    antialias: true,
  });
  let saveName = "";

  let editor: Editor;
  let storageManager = new StorageManager();
  onMount(async () => {
    let graphics: Pixi.Graphics;
    graphics = new Pixi.Graphics();
    editor = new Editor(app.stage, app.ticker, graphics);

    app.stage.addChild(graphics);
    //@ts-ignore
    document.body.appendChild(app.view);

    window.addEventListener("keydown", (e) => {
      e.key === "d" && console.log(editor);
    });

    editor.load(storageManager.components["not2"]);
  });
</script>

<div style="position: absolute; top:600px">
  <div>
    <button on:click={(e) => editor.addComponent(new LvlInputEditor())}
      >Create LvlIn</button
    >
    <button on:click={(e) => editor.addComponent(new LvlOutPutEditor())}
      >Create LvlOut</button
    >
    {#each ["nand", "inGate"] as x}
      <button on:click={(e) => editor.addComponent(getComponent(x))}
        >Create {x}</button
      >
    {/each}
  </div>
  <div>
    <input
      type="text"
      placeholder="component name"
      bind:value={saveName}
    /><button
      on:click={(e) => {
        storageManager.addComponent(saveName, editor.save(saveName));
      }}>Save</button
    >
  </div>
  {#if storageManager.components}
    {#each Object.values(storageManager.components) as x}
      <button on:click={(e) => editor.load("not")}>Create {x.name}</button
      >{/each}
  {/if}
  <button on:click={(e) => editor.clear()}>Clear</button>
</div>
