import { getComponent } from "../components/aNotGood";
import { gSavePath } from "../utils/globals";
import type { Save } from "../utils/types";
import type { Component } from "./Component";
import { CustomComponent } from "./CustomComponent";

export class SaveLoader {
  path: string;
  loadedComponent: CustomComponent;
  constructor(name: string) {
    this.path = gSavePath + name + ".json";
  }

  async load() {
    return fetch(this.path).then((res) =>
      res.json().then((save: Save) => {
        let name = save.name;
        let comps: { [key: string]: Component } = {};
        save.comps.forEach((x) => {
          comps[x.id] = getComponent(x.type);
        });

        save.cons.forEach((x) => {
          comps[x.comp1][x.type1 + "Nodes"][x.nr1].connectToPin(
            comps[x.comp2][x.type2 + "Nodes"][x.nr2]
          );
        });

        console.log(save.comps);
        let retComp = new CustomComponent(name);
        Object.values(comps).forEach((x) => {
          console.log("singleComp", x);

          retComp.addComponent(x);
        });
        this.loadedComponent = retComp;
      })
    );
  }
}
