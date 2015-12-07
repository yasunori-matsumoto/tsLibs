import Ease = require('ex/easing/Ease');

class AlphaButton {
  constructor(public _node:any) {
    this._node.hover(this.overHD, this.outHD);
  }
  
  overHD = (e):void => {
    $(e.currentTarget).velocity("stop").velocity({opacity:0.8, scale:0.95}, {duration:400, delay:0, easing:Ease.EaseOutSine});
  }
  
  outHD = (e):void => {
    $(e.currentTarget).velocity("stop").velocity({opacity:1, scale:1}, {duration:400, delay:0, easing:Ease.EaseOutSine});
  }
}
export = AlphaButton