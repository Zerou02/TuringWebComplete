import { gCmpStrgPth } from "../utils/globals";
import type { Save, SaveComp } from "../utils/types";

export class StorageManager {
  components: { [key: string]: Save } = {};
  constructor() {
    let stuff = JSON.parse(localStorage.getItem(gCmpStrgPth));
    Object.entries(stuff).forEach(([key, val]: [string, string]) => {
      //    this.components[key] = JSON.parse(val);
    });
    this.components = stuff;
    console.log("stuff", stuff);
  }

  addComponent(name: string, save: Save) {
    this.components[name] = save;
    localStorage.setItem(gCmpStrgPth, JSON.stringify(this.components));
  }
}
