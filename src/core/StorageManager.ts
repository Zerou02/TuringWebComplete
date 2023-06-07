import { gCmpStrgPth } from "../utils/globals";
import type { Save } from "../utils/types";

export class StorageManager {
  components: { [key: string]: Save } = {};

  constructor() {
    let stuff = JSON.parse(localStorage.getItem(gCmpStrgPth));
    console.log(stuff);

    if (!stuff) {
      localStorage.setItem(gCmpStrgPth, JSON.stringify({}));
    }
    this.components = stuff;
  }

  addComponent(name: string, save: Save) {
    this.components[name] = save;
    localStorage.setItem(gCmpStrgPth, JSON.stringify(this.components));
  }
  deleteComponent(name: string) {
    delete this.components[name];
    localStorage.setItem(gCmpStrgPth, JSON.stringify(this.components));
  }
}
