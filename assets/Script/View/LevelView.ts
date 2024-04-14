// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//import {LevelInfo} from "../Model/ConstValue";
const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelView extends cc.Component {
    
    private _step : cc.Label = null;
  
    private _totalTime : cc.Label = null;
    
    private _target : cc.Label = null;

    onLoad () {
       this._step = this.node.getChildByName("step").getComponent(cc.Label);
       this._totalTime = this.node.getChildByName("totalTime").getComponent(cc.Label);
       this._target = this.node.getChildByName("target").getComponent(cc.Label);
       //console.log("xxxxxxx" + this._step.string)

       // console.log("xxxxxxxx" + LevelInfo[2])
       //this._step = this.node.getComponentInChildren("step") as cc.Label;
       //this._totalTime = this.node.getComponentInChildren("totalTime") as cc.Label;
       //this._target = this.node.getComponentInChildren("target") as cc.Label;
      
      //console.log("XXXXXXX step: ", this._step.string)
      // console.log("XXXXXXX totalTime ", this._totalTime.string)
      // console.log("XXXXXXX target", this._target.string)
    }


    start () {

    }

    updateTime(time:number) {
        this._totalTime.string = String(time);
    }
    updateStep (step:number) {
        this._step.string = String(step);
    }
    updateTarget(target) {
        if (this._target === null) {
            this._target = this.node.getChildByName("target").getComponent(cc.Label);
        }
        this._target.string = "";
        target.forEach((value, cellType) =>{
            let cur_target =  String(cellType)+ ":"+ String(value[1]) + "/" + String(value[0]) + ";";
            console.log("xxx cur_target:", cur_target);
            this._target.string = this._target.string + cur_target;
        }
        )
    }
    // update (dt) {}
}
