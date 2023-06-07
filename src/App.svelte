<script lang="ts">
  import * as Pixi from "pixi.js";
  import {
    ww,
    wh,
    gIconPath,
    gMouseManager,
    gCableDrawer,
  } from "./utils/globals";
  import { onMount } from "svelte";
  import { Editor } from "./core/Editor";
  import { LvlInputEditor } from "./components/LvlInputEditor";
  import { LvlOutPutEditor } from "./components/LvlOutPutEditor";
  import { StorageManager } from "./core/StorageManager";
  import { getComponent } from "./components/aNotGood";
  import type { ComponentTypes } from "./utils/types";

  let app = new Pixi.Application({
    width: ww,
    height: wh,
    background: "purple",
    antialias: true,
  });
  let saveName = "";

  let editor: Editor;
  let storageManager = new StorageManager();
  let errorMessage = "";
  onMount(async () => {
    let graphics: Pixi.Graphics;
    graphics = new Pixi.Graphics();
    editor = new Editor(app.stage, app.ticker, graphics, storageManager);

    app.stage.addChild(graphics);
    //@ts-ignore
    document.body.appendChild(app.view);

    window.addEventListener(
      "keydown",
      (e) => e.key === "d" && console.log(editor)
    );

    editor.load(storageManager.components["not"]);
  });

  let regularTypes: ComponentTypes[] = ["nand", "inGate"];
</script>

<div style="position: absolute; top:600px">
  <div>
    <button on:click={(e) => editor.addComponent(new LvlInputEditor())}
      >Create LvlIn</button
    >
    <button on:click={(e) => editor.addComponent(new LvlOutPutEditor())}
      >Create LvlOut</button
    >
    {#each regularTypes as x}
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
        if (storageManager.components[saveName]) {
          errorMessage =
            "There is already a component with this name. Delete it beforehand.";
        } else {
          editor.save(saveName);
          errorMessage = "";
          storageManager = storageManager;
        }
      }}>Save</button
    >
    <button
      on:click={(e) => {
        storageManager.deleteComponent(saveName);
        storageManager = storageManager;
      }}>Delete</button
    >
    <br />
    <span style="color: red;">{errorMessage}</span>
  </div>
  {#if storageManager.components}
    {#each Object.entries(storageManager.components) as [key, value]}
      <button on:click={(e) => editor.load(storageManager.components[key])}
        >Create {key}</button
      >{/each}
  {/if}
  <button on:click={(e) => editor.clear()}>Clear</button>
  <br />
  <img
    src={gIconPath + "trashcan.png"}
    alt=""
    style="padding: 12px; border: 1px solid black; position:relative; top: -140px; left: 700px;"
    on:mouseup={(e) => {
      editor.removeComponent(gMouseManager.currentlyHeldComponent);
      gMouseManager.currentlyHeldComponent = null;
      gCableDrawer.isCableDrawn = false;
      gCableDrawer.firstPin = null;
    }}
  />
</div>
