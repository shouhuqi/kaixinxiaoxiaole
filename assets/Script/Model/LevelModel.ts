// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//import {CELL_TYPE} from "./ConstValue";

import LevelView  from "../View/LevelView"; 
export default class LevelModel  {
    private _levelView : LevelView = null;
    private _curLevel = 0;
    private _curStep = 0;
    private _targetInfo = new Map<number, number>; // [type,target];

    constructor(levelview:LevelView) {
        this._levelView = levelview;
    }
 
    init(curLevel:number, levelTarget:Map<string, number>, maxStep:number) {
        this._curLevel = curLevel;
        this._curStep = maxStep;
        this._targetInfo.clear();
        levelTarget.forEach((target, cellType) =>{
            let ncelltype = Number(cellType);
            console.log("xxx celltype, target", ncelltype, target);
            this._targetInfo.set(ncelltype, target);
        }
        )
        this.debugPrintTarget("init level model");
        this._levelView.updateTarget(this._targetInfo);
        this._levelView.updateStep(this._curStep);
    }

    updateTime(time:number) {
        this._levelView.updateTime(time);
    }
    getCurStep() {
        return this._curStep;
    }
    subStep() {
        if (this._curStep > 0) {
            this._curStep--;
            this._levelView.updateStep(this._curStep);
        }
        return this._curStep;
    }

    getCurLevel() {
        return this._curLevel;
    }
    addLevel() {
        this._curLevel++;
        return this._curLevel;
    }

    matchOne(cellType, num) {
        console.log("match sucesss type:", cellType, " num:",num);
        if (this._targetInfo.has(cellType)) {
            let target = this._targetInfo.get(cellType);
            target = target - num;
            if (target < 0) {
                target = 0;
            }
            this._targetInfo.set(cellType, target);
            this._levelView.updateTarget(this._targetInfo);
        }
        return this._targetInfo;
    }

    
    checkMatch() {
        let match_success = true;
        this.debugPrintTarget("checkMatch ");
        this._targetInfo.forEach((target, cellType) => {
            if (target > 0) {
                match_success = false;
            }

            if(!match_success) {
                return;
            }
        }
        );
        return match_success;
    }

    debugPrintTarget(debugInfo:string) {
        console.log(debugInfo, " begin target info:")
        this._targetInfo.forEach((target, cellType) => {
            console.log(" cellType, target:", cellType, target);
        }
        );
        console.log(debugInfo, "end target info:")
    }
}