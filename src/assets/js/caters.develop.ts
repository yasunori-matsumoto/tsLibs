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

$(document).ready(function() {
  new caters.develop.Main();
});

module caters.develop {
  export class Ease {
    public static EaseOutSine     :string = "easeOutSine";
    public static EaseInSine      :string = "easeInSine";
    public static EaseOutCubic    :string = "easeOutCubic";
    public static EaseInCubic     :string = "easeInCubic";
    public static EaseInOutCubic  :string = "easeInOutCubic";
    public static EaseEaseOutQuart:string = "easeOutQuart";
    public static EaseEaseInQuart :string = "easeInQuart";
  }
  
  export class EventDispatcher {
    public dispatcher:any;
    
    constructor() {
      this.dispatcher = $(window);
    }
  }
  export class Main extends EventDispatcher {
    constructor() {
      super();
      new BackgroundCanvas();
    }
  }
  
  export class BackgroundCanvas extends EventDispatcher {
    private _id:string = 'pixi_canvas';
    private _stage:any;
    private _renderer:any;
    private _renderingTimer:any;
    private _particleContainer:any;
    
    constructor() {
      super();
      PIXI.utils._saidHello = true;
      
      var _rendererOptions = { antialias:true };
      this._renderer = PIXI.autoDetectRenderer(640, 480);
      this._renderer.backgroundColor = 0x000000;
      this._renderer.plugins.interaction.autoPreventDefault = false;
      
      
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
    constructor() {
      super(PIXI.Texture.fromImage('img/*.png'));
    }
    
    update = ():void => {
    }
    
    dispose = ():void => {
      
    }
  }
}