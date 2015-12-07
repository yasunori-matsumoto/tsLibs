import Ease = require('ex/easing/Ease');
import MouseEvent = require('ex/events/MouseEvents');
import EventDispatcher = require('ex/events/EventDispatcher');


class PageTop extends EventDispatcher {
  constructor(public _node:any) {
    this._node = _node;
    this._node.addEventListener(MouseEvent.CLICK, this.go2Top);
  }
  go2Top = ():void => {
    Velocity(document.getElementsByTagName('html'), 'scroll', {duration:1000, easing:Ease.EaseInOutCubic, offset:0});
  }
}
export = PageTop;