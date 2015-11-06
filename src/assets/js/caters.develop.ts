var log = (_state:any):void => {
  console.log(_state);
};

if (Date.now === undefined) {
  Date.now = function () {
    return new Date().valueOf();
  };
}

interface Window {
  webkitRequestAnimationFrame():void;
  mozRequestAnimationFrame():void;
  oRequestAnimationFrame():void;
  msRequestAnimationFrame():void;
  requestAnimFrame(_callback):any;
  cancelAnimFrame(opt:any):void;
  cancelRequestAnimationFrame():void;
  webkitCancelAnimationFrame():void;
  webkitCancelRequestAnimationFrame():void;
  mozCancelAnimationFrame():void;
  mozCancelRequestAnimationFrame():void;
  msCancelAnimationFrame():void;
  msCancelRequestAnimationFrame():void;
  oCancelAnimationFrame():void;
  oCancelRequestAnimationFrame():void;
  fastClick():any;
}

window.requestAnimFrame = (():any => {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback){
    return window.setTimeout(callback, 1000/60);
  };
})();

window.cancelAnimFrame = (():any => {
  return window.cancelAnimationFrame ||
  window.cancelRequestAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.oCancelRequestAnimationFrame ||
  function(id) { window.clearTimeout(id); };
})();

module MouseEvents {
  export var CLICK     :string = ("ontouchend" in window) ? "touchend" : "click";
  export var MOUSE_DOWN:string = ("ontouchstart" in window) ? "touchstart" : "mousedown";
  export var MOUSE_UP  :string = ("ontouchend" in window) ? "touchend"     : "mouseup";
  export var MOUSE_MOVE:string = ("ontouchmove" in window) ? "touchmove"   : "mousemove";
  export var MOUSE_OVER:string = "mouseenter";
  export var MOUSE_OUT :string = "mouseleave";
}

module Events {
  export const COMPLETE:string = "complete";
  export const INIT    :string = "init";
  export const CHANGE  :string = "change";
  export const RESIZE  :string = "resize";
  export const SCROLL  :string = "scroll";
  export const REMOVED :string = "removed";
  export const SUCCESS :string = "success";
  export const ERROR   :string = "error";
}

// module State {
//   export const video:boolean = !!document.createElement('video').canPlayType;
//   export const canvas:boolean = !!document.createElement('canvas').getContext;
// }

module Ease {
  export const Ease          :string = "ease";
  export const Ease_IN       :string = "ease-in";
  export const Ease_OUT      :string = "ease-out";
  export const Ease_IN_OUT   :string = "ease-in-out";
  export const EaseInSine    :string = "easeInSine";
  export const EaseOutSine   :string = "easeOutSine";
  export const EaseInOutSine :string = "easeInOutSine";
  export const EaseInQuad    :string = "easeInQuad";
  export const EaseOutQuad   :string = "easeOutQuad";
  export const EaseInOutQuad :string = "easeInOutQuad";
  export const EaseInCubic   :string = "easeInCubic";
  export const EaseOutCubic  :string = "easeOutCubic";
  export const EaseInOutCubic:string = "easeInOutCubic";
  export const EaseInQuart   :string = "easeInQuart";
  export const EaseOutQuart  :string = "easeOutQuart";
  export const EaseInOutQuart:string = "easeInOutQuart";
  export const EaseInQuint   :string = "easeInQuint";
  export const EaseOutQuint  :string = "easeOutQuint";
  export const EaseInOutQuint:string = "easeInOutQuint";
  export const EaseInExpo    :string = "easeInExpo";
  export const EaseOutExpor  :string = "easeOutExpo";
  export const EaseInOutExpo :string = "easeInOutExpo";
  export const EaseInCirc    :string = "easeInCirc";
  export const EaseOutCirc   :string = "easeOutCirc";
  export const EaseInOutCirc :string = "easeInOutCirc";
}

$(document).ready(function() {
  FastClick.attach(document.body);
  new caters.develop.Main();
});

module caters.develop {
  export class EventDispatcher {
    public static Dispatcher:any;
    protected dispatcher:any;
    constructor() {
      if (!EventDispatcher.Dispatcher) {
        EventDispatcher.Dispatcher = $(window);
      }
      this.dispatcher = EventDispatcher.Dispatcher;
    }
  }
  
  export class DisplayObject extends EventDispatcher {
    protected _origin:any;
    protected _style:any;
    protected _visible:boolean = true;
    protected _buttonMode:boolean = true;
    protected _scaleX:number = 1;
    protected _scaleY:number = 1;
    protected _alpha:number = 1;
    protected _width:number = 0;
    protected _height:number = 0;
    protected _rotation:number = 0;
    protected _rotationX:number = 0;
    protected _rotationY:number = 0;
    protected _rotationZ:number = 0;

    constructor(public _node:JQuery) {
      super();
      this._origin = this._node.get(0);
      this._style = this._origin.style;
      this._width = this._origin.offsetWidth;
      this._height = this._origin.offsetHeight;
    }
    
    to = (_param, _options):any => {
      this._node.velocity(_param, _options);
      return this;
    }
    
    stop = ():any => {
      this._node.velocity("stop");
      return this;
    }
    
    vcss = (_param:any):void => {
      for (var key in _param) {
        console.log(key);
        $.Velocity.hook(this._node, key, _param[key]);
      }
    }
    
    //- . . . . . . . . . . . . . . .  . . . visible <
    get visible():boolean {
      return this._visible;
    }
    
    set visible(_state:boolean) {
      this._visible = _state;
      this._style.display = _state ? "block" : "none";
    }
    
    //- . . . . . . . . . . . . . . .  . . . width <
    get width():number {
      return this._width;
    }
    
    set width(_num:number) {
      this._width = _num;
      this._style.width = _num + 'px';
    }
    
    //- . . . . . . . . . . . . . . .  . . . height <
    get height():number {
      return this._height;
    }
    
    set height(_num:number) {
      this._height = _num;
      this._style.height = _num + 'px';
    }
    
    //- . . . . . . . . . . . . . . .  . . . cursor <
    get buttonMode():boolean {
      return this._buttonMode;
    }
    
    set buttonMode(_bool:boolean) {
      this._buttonMode = _bool;
      this._style.cursor = _bool ? 'pointer' : 'default';
    }
    
    //- . . . . . . . . . . . . . . .  . . . opacity <
    get alpha():number {
      return this._alpha;
    }
    
    set alpha(_alpha:number) {
      this._alpha = _alpha;
      this._style.opacity = _alpha;
    }
    
    //- . . . . . . . . . . . . . . .  . . . rotation <
    get rotation():number {
      return this._rotation;
    }
    
    set rotation(_rotation:number) {
      this._rotation = _rotation;
      this.vcss({rotateZ : _rotation + 'deg'});
    }
    
    //- . . . . . . . . . . . . . . .  . . . scaleX <
    get scaleX():number {
      return this._scaleX;
    }
    
    set scaleX(_scale:number) {
      this._scaleX = _scale;
      this.vcss({scaleX:_scale});
    }
    
    //- . . . . . . . . . . . . . . .  . . . scaleY <
    get scaleY():number {
      return this._scaleY;
    }
    
    set scaleY(_scale:number) {
      this._scaleY = _scale;
      this.vcss({scaleY:_scale});
    }
    
    //- . . . . . . . . . . . . . . .  . . . pivot <
    set pivot(_pivot:any) {
      this._style['transform-origin'] = _pivot.x + 'px ' + _pivot.y + 'px';
    }
  }
  
  export class Main extends EventDispatcher {
    constructor() {
      super();
      new BackgroundCanvas();
      log(0);
      new Obj($('#testObj'));
    }
  }
  
  export class Obj extends DisplayObject {
    constructor(_node:JQuery) {
      super(_node);
      
      this.vcss({'margin-left': '10px', display:'block', backgroundColor:'#ff00ff'});
      this.to({color:'#ff0000'}, 0);
      this.pivot = {x:10, y:10};
      this.visible = true;
      this.scaleX = this.scaleY = 0.5;
      this.alpha = 0.5;
      this.width = 100;
      this.buttonMode = true;
      this.rotation = 45;
      // this.to({'margin-left':300}, {duration:30000, easing:Ease.EaseOutSine});
      
      var _self = this;
      this._node.bind('click', function() {
        _self.stop().to({'margin-top':300}, {duration:30000, easing:Ease.EaseOutSine})
      })
    }
  }
  
  export class PixiStage extends EventDispatcher {
    private _id:string = 'canvas';
    public  _stage:any;
    public  _particleContainer:any;
    
    private _renderer:any;
    private _renderingTimer:any;
    
    constructor(_options:any) {
      super();
      if (_options.id) this._id = _options.id;
      
      PIXI.utils._saidHello = true;
      
      var _rendererOptions = { antialias:true };
      this._renderer = PIXI.autoDetectRenderer(640, 480);
      this._renderer.backgroundColor = 0x000000;
      document.getElementById(this._id).appendChild(this._renderer.view);
      this._stage = new PIXI.Container();
      this._particleContainer = new PIXI.ParticleContainer();
      this._stage.addChild(this._particleContainer);
      
      this._renderer.render(this._stage);
      this.onResizeHD();
      this.dispatcher.bind('resize', _.throttle(this.onResizeHD, 200));
      this._renderingTimer = window.requestAnimFrame(this.rendering);
    }
    
    rendering = ():void => {
      this._renderer.render(this._stage);
      this._renderingTimer = window.requestAnimFrame(this.rendering);
    }

    onResizeHD = ():void => {
      this._renderer.resize(this.dispatcher.width(), this.dispatcher.height());
    }
  }
  
  export class Particle extends PIXI.Sprite {
    protected _imagePath:string;
    constructor(_options) {
      super();
      if (_options.image) this._imagePath = _options.image;
      this._texture = PIXI.Texture.fromImage(this._imagePath);
    }
  }
  
  export class BackgroundCanvas extends PixiStage {
    constructor() {
      super({id:'bg_canvas'});
      console.log(this._stage);
    }
  }
}