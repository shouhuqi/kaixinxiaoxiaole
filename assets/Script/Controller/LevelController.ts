import LevelModel from "../Model/LevelModel";
import {LevelConfig} from "../Model/ConstValue";
import LevelView from "../View/LevelView";

export default class LevelController extends cc.Component { 
   private _levelModel:LevelModel = null;
   private _totalTime:number = 0;
   init(levelview:LevelView, curLevel:number) {
       this._levelModel = new LevelModel(levelview);
       this.startNextLevel(curLevel);
       this.schedule(this.onTick1S, 1);
       return 0;
   }

   startNextLevel(level:number) {
       var config = LevelConfig[level];
       if (config == null) {
           console.log("can not find level config, level:" + level);
           return -1;
       }
       let maxStep = config[0];
       this._totalTime = config[1];
       let  levelTarget = new Map();

       for (const celltype in config[2]) {
           levelTarget.set(celltype, config[2][celltype]);
       }
       console.log("Level:", level, " maxStep:", maxStep, " totalTime:", this._totalTime, " target:", this._levelTarget);

       this._levelModel.init(level, levelTarget, maxStep);
   }

   onTick1S() {
        this._levelModel.updateTime(this._totalTime);
        this._totalTime--;
        if (this._totalTime < 0 ) {
            this.onLevelFailed("Timeout");
        }
   }
   
    checkNextStep() {
        let curStep = this._levelModel.getCurStep();
        if (curStep == 0) {
            return false;
        }
        return true;
    }

    onStepOne (changeModels) {
        this._levelModel.subStep();
        let matchinfo = new Map();
        changeModels.forEach(models => {
            if (models.isDeath) {
                if (matchinfo.has(models.type)) {
                    let value = matchinfo.get(models.type);
                    matchinfo.set(models.type, value + 1);
                } else {
                    matchinfo.set(models.type, 1);
                }
            }
        }, this);

        let needCheck = false;

        matchinfo.forEach((matchnum, cellType) =>{
            let ncelltype = Number(cellType);
            if (matchnum >= 3) {
                needCheck = true;
                this._levelModel.matchOne(ncelltype, matchnum);
            }
        }
        ) 
        if (needCheck) {
            if (this._levelModel.checkMatch()) {
                this.onLevelSuccess();
            }
        }
    }


    onLevelFailed(reason) {
        this.unschedule(this.onTick1S);
        console.log("level failed:", reason);
    }

    onLevelSuccess() {
        this.startNextLevel(this._levelModel.addLevel());
    }
}
