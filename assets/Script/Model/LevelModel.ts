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
    private _targetInfo = new Map<number, []>; // type:[target,process];

    constructor(levelview:LevelView) {
        this._levelView = levelview;
    }
 
    init(curLevel:number, levelTarget:Map<string, number>) {
        console.log("xxxx level model start init");
        this._curLevel = curLevel;
        this._curStep = 0;
        this._targetInfo.clear();
        levelTarget.forEach((target, cellType) =>{
            let ncelltype = Number(cellType);
            console.log("xxxx level model xxxx 1 ");
            this._targetInfo.set(ncelltype, [target, 0]);
            console.log("xxxx level model xxxx 2 ");
        }
        )

        console.log("xxxx level model init 1");
        this._levelView.updateTarget(this._targetInfo);
        console.log("xxxx level model end init");
    
    }

    updateTime(time:number) {
        this._levelView.updateTime(time);
    }
    getCurStep() {
        return this._curStep;
    }
    addStep() {
        this._curStep++;
        this._levelView.updateStep(this._curStep);
        return this._curStep;
    }
    resetCurStep() {
        this._curStep = 0;
    }
    getCurLevel() {
        return this._curLevel;
    }
    addLevel() {
        this._curLevel++;
        return this._curLevel;
    }

    getTargetInfo() {
        return this._targetInfo;
    }

    matchOne(cellType, num) {
        console.log("xxxxx match type:", cellType, " num:",num);
        if (this._targetInfo.has(cellType)) {
            let target = this._targetInfo.get(cellType);
            let process = target[1] + num;
            this._targetInfo.set(cellType, [target[1], process]);
            this._levelView.updateTarget(this._targetInfo);
        }
        return this._targetInfo;
    }

    /*
    checkMatch() {
        let match_success = true;
        this._targetInfo.forEach((cellType, target) => {
            if (target[1] < target[0]) {
                match_success = false;
                //TODO
            }
        });
        return match_success;
    }
    */

}