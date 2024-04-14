import GameModel from "../Model/GameModel";
import Toast from '../Utils/Toast';
import LevelController  from "./LevelController";

cc.Class({
  extends: cc.Component,
  properties: {
    grid: {
      default: null,
      type: cc.Node
    },
    level: {
      default: null,
      type: cc.Node
    },
    audioButton: {
      default: null,
      type: cc.Node
    },
    audioSource: {
      type: cc.AudioSource
    }
  },
  _levelController : null,

  // use this for initialization
  onLoad: function () {
    console.log("xxxxx on load start:", this.node.name);
    console.log("xxxxxxxxxx: level",  this.level);    
    console.log("xxxxxxxxxx: grid", this.grid);   


   // let audioButton = this.node.parent.getChildByName('audioButton')
    //audioButton.on('click', this.callback, this)
    this.gameModel = new GameModel();
    this.gameModel.init(4, 1);
    var gridScript = this.grid.getComponent("GridView");
    console.log("xxxxx on load 1");
    gridScript.setController(this);
    gridScript.initWithCellModels(this.gameModel.getCells());

    console.log("xxxxx on load 2");
    this._levelController = new LevelController();
    var levelView = this.level.getComponent("LevelView");
     
    console.log("xxxxx on load 3");
    this._levelController.init(levelView, 1);

    //this.audioSource = cc.find('Canvas/GameScene')._components[1].audio;
    console.log("xxxx on load end", this.node.name);
  },

  callback: function () {
    let state = this.audioSource._state;
    state === 1 ? this.audioSource.pause() : this.audioSource.play()
    Toast(state === 1 ? '关闭背景音乐🎵' : '打开背景音乐🎵' )
  },

  selectCell: function (pos) {
    var result = this.gameModel.selectCell(pos);
    if (result[0].length > 0) {
      this._levelController.onStepOne(result[0]);
    }
    return result;
  },
  cleanCmd: function () {
    this.gameModel.cleanCmd();
  }
});
