import type { ComponentType } from "svelte";
import type { LvlInputEditor } from "../components/LvlInputEditor";
import type { LvlOutPutEditor } from "../components/LvlOutPutEditor";
import { getComponent } from "../components/aNotGood";
import type { MiddleComp, Save, SaveCon } from "../utils/types";
import { firstLetterToLower, firstLetterToUpper } from "../utils/utils";
import type { Component } from "./Component";
import { CustomComponent } from "./CustomComponent";
import type { Pin } from "./Pin";
import type { StorageManager } from "./StorageManager";
import { LvlInput } from "../components/LvlInput";
import { LvlOut } from "../components/LvlOutPut";

export class SaveLoader {
  storageMgr: StorageManager;
  constructor(storageMgr: StorageManager) {
    this.storageMgr = storageMgr;
  }

  load(save: Save) {
    let amountCustom = 0;
    let compMap: {
      in: LvlInput[];
      out: LvlOut[];
      [key: string]: any;
    } = {
      in: [],
      out: [],
    };
    for (let a = 0; a < save.comps.ins; a++) {
      compMap["in"].push(new LvlInput());
    }
    for (let a = 0; a < save.comps.outs; a++) {
      compMap["out"].push(new LvlOut());
    }
    save.comps.middles.forEach((x) => {
      if (x.type === "custom") {
        let comp = this.load(this.storageMgr.components[x.name]);
        compMap[x.type + amountCustom] = comp;
        amountCustom++;
      } else {
        compMap[x.id] = getComponent(x.type);
      }
    });

    save.conns.forEach((x) => {
      let outPinDescr = x.out.split(" ");
      let outPin: Pin;
      if (outPinDescr.length === 3) {
        let comp = compMap[outPinDescr[0]] as Component;
        if (outPinDescr[1] === "in") {
          outPin = comp.inNodes[outPinDescr[2]];
        } else {
          outPin = comp.outNodes[outPinDescr[2]];
        }
      } else {
        if (outPinDescr[0] === "in") {
          outPin = compMap.in[outPinDescr[1]].outNodes[0];
        } else {
          console.error("Should not happen");
        }
      }
      let inPinDescr = x.in.split(" ");
      let inPin: Pin;
      if (inPinDescr.length === 3) {
        let comp = compMap[inPinDescr[0]] as Component;
        if (inPinDescr[1] === "in") {
          inPin = comp.inNodes[inPinDescr[2]];
        } else {
          inPin = comp.outNodes[inPinDescr[2]];
        }
      } else {
        if (inPinDescr[0] === "out") {
          inPin = compMap.out[inPinDescr[1]].inNodes[0];
        } else {
          console.error("Should not happen");
        }
      }
      outPin.connectToPin(inPin);
    });
    let retComp = new CustomComponent(save.id);
    Object.entries(compMap).forEach(([key, val]) => {
      if (key === "in" || key === "out") {
        val.forEach((x) => retComp.addComponent(x));
      } else {
        retComp.addComponent(val);
      }
    });
    return retComp;
  }

  createSave(name: string, comps: Component[]): Save {
    let usedCompTypesMap: { [key: string]: Component[] } = {};
    let retSave: Save = {
      comps: { ins: 0, middles: [], outs: 0 },
      conns: [],
      id: name,
    };

    comps.forEach((x) => {
      if (!usedCompTypesMap[x.type]) {
        usedCompTypesMap[x.type] = [];
      }
      usedCompTypesMap[x.type].push(x);
      let middle: MiddleComp = {
        type: x.type,
        id: x.type + (usedCompTypesMap[x.type].length - 1),
        name: x.name,
      };
      if (x.type === "lvlIn") {
        retSave.comps.ins++;
      } else if (x.type === "lvlOut") {
        retSave.comps.outs++;
      } else {
        retSave.comps.middles.push(middle);
      }
    });

    Object.entries(usedCompTypesMap).forEach(([key, value], i) => {
      value.forEach((x, xi) => {
        x.outNodes.forEach((y, yi) => {
          let inVal: string;
          if (y.component.type === "lvlIn") {
            inVal = "in " + xi;
          } else if (y.component.type === "lvlOut") {
            //customComp-Fall
            inVal = x.type + xi + " out " + yi;
          } else {
            inVal = y.component.type + xi + " out " + yi;
          }
          y.connectedNodes.forEach((z, zi) => {
            let conn: SaveCon = { out: inVal, in: "" };
            if (z.component.type === "lvlIn") {
              //customComp-Fall2
              conn.in =
                z.component.topLevelComponent.type +
                usedCompTypesMap[z.component.topLevelComponent.type].findIndex(
                  (z2) => z2.id === z.component.topLevelComponent.id
                ) +
                " in " +
                z.name;
            } else if (z.component.type === "lvlOut") {
              conn.in = "out " + z.name;
            } else {
              conn.in =
                z.component.type +
                usedCompTypesMap[z.component.type].findIndex(
                  (x) => x.id === z.component.id
                ) +
                " in " +
                z.name;
            }
            retSave.conns.push(conn);
          });
        });
      });
    });
    return retSave;
  }
}
