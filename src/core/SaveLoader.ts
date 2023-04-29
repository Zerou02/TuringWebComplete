import { getComponent } from "../components/aNotGood";
import type { Save, SaveComp, SaveCon } from "../utils/types";
import type { Component } from "./Component";
import { CustomComponent } from "./CustomComponent";
import type { Pin } from "./Pin";

export class SaveLoader {
  constructor() {}

  load(save: Save) {
    console.log(save);

    let name = save.name;
    let comps: { [key: string]: Component } = {};
    save.comps.forEach((x) => {
      comps[x.id] = getComponent(x.type);
    });

    console.log(comps);

    save.cons.forEach((x) => {
      comps[x.comp1][x.type1 + "Nodes"][x.nr1].connectToPin(
        comps[x.comp2][x.type2 + "Nodes"][x.nr2]
      );
    });

    let retComp = new CustomComponent(name);
    Object.values(comps).forEach((x) => {
      retComp.addComponent(x);
    });
    return retComp;
  }

  saveComponent(name: string, comps: Component[]) {
    let save: Save = { comps: undefined, cons: undefined, name };
    let compsObj: SaveComp[] = [];

    let pinMap: { [key: string]: Pin } = {};
    let cons: SaveCon[] = [];
    comps.forEach((x) => {
      let compObj: SaveComp = {
        id: x.id.toString(),
        type: x.type,
        name: x.name,
      };
      compsObj.push(compObj);
      x.inNodes.forEach((x) => {
        pinMap[x.id] = x;
      });
      x.outNodes.forEach((x) => {
        pinMap[x.id] = x;
      });
    });
    comps.forEach((x) => {
      x.outNodes.forEach((y, i) => {
        y.connectedNodes.forEach((z, j) => {
          let con: SaveCon = {
            comp1: y.component.id.toString(),
            type1: y.type,
            nr1: i,
            comp2: z.component.id.toString(),
            type2: z.type,
            nr2: j,
          };
          cons.push(con);
        });
      });
    });

    save.cons = cons;
    save.comps = compsObj;

    console.log(save);
    return save;
  }
}
