import EventDispatcher = require('ex/events/EventDispatcher');
import Event = require('ex/events/Event');
import MouseEvent = require('ex/events/MouseEvent');
import Ease = require('ex/easing/Ease');

import PixiStage = require('ex/display/pixi/PixiStage');


class PixiDevelop extends PixiStage {
  constructor() {
    super({
      id : 'test_canvas',
      backgroundColor : 0x000000
    });
  }
  
  rendering = ():void => {
    this._renderer.render(this._stage);
    this._renderingTimer = window.requestAnimFrame(this.rendering);
  }
}
export = PixiDevelop;