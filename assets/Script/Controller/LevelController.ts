import LevelModel from "../Model/LevelModel";
import {LevelConfig} from "../Model/ConstValue";
import LevelView from "../View/LevelView";

export default class LevelController extends cc.Component { 
   private _levelModel:LevelModel = null;
   private _maxStep:number = 0;
   private _totalTime:number = 0;
   private _levelTarget = new Map();
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
       this._maxStep = config[0];
       this._totalTime = config[1];
       for (const celltype in config[2]) {
           this._levelTarget.set(celltype, config[2][celltype]);
       }
       console.log("xxx Level:", level, " maxStep:", this._maxStep, " totalTime:", this._totalTime, " target:", this._levelTarget);

       this._levelModel.init(level, this._levelTarget);
   }

   onTick1S() {
        this._levelModel.updateTime(this._totalTime);
        this._totalTime--;
        if (this._totalTime < 0 ) {
            this.onLevelFailed("Timeout");
        }
   }
   
    checkNextStep() {
        let nextStep = this._levelModel.getCurStep() + 1;
        if (nextStep >= this._maxStep ) {
            return false;
        }
        return true;
    }

    onStepOne (changeModels) {
        this._levelModel.addStep();
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
            /*
            if (this._levelModel.checkMatch()) {
                this.onLevelSuccess();
            }
            */
        }
    }


    onLevelFailed(reason) {
        this.unschedule(this.onTick1S);
        console.log("level failed:", reason);
    }

    onLevelSuccess() {
        console.log("level success");
        this.startNextLevel(this._levelModel.addLevel());
    }
}
