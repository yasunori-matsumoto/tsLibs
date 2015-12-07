class PixiStage {
  private _id:string = 'canvas';
  protected  _stage:any;
  protected  _particleContainer:any;
  protected _renderer:any;
  protected _renderingTimer:any;
  private _backgroundColor:number = 0x000000;
  
  constructor(_options:any) {
    if (_options.id) this._id = _options.id;
    if (_options.backgroundColor) this._backgroundColor = _options.backgroundColor;
    
    // this._backgroundColor = 0x000000
    PIXI.utils._saidHello = true;
    
    var _rendererOptions = { antialias:true };
    
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('firefox') != -1) {
      this._renderer = new PIXI.CanvasRenderer(640, 480);
    } else {
      this._renderer = new PIXI.CanvasRenderer(640, 480);
      // this._renderer = PIXI.autoDetectRenderer(640, 480);
    }
    
    this._renderer.backgroundColor = this._backgroundColor;
    document.getElementById(this._id).appendChild(this._renderer.view);
    this._stage = new PIXI.Container();
    this._particleContainer = new PIXI.ParticleContainer();
    this._stage.addChild(this._particleContainer);
    
    this._renderer.render(this._stage);
    this.onResizeHD();
    this._renderingTimer = window.requestAnimFrame(this.rendering);
    $(window).bind(Events.RESIZE, this.onResizeHD);
  }
  
  rendering = ():void => {
    this._renderer.render(this._stage);
    this._renderingTimer = window.requestAnimFrame(this.rendering);
  }

  onResizeHD = ():void => {
    var _parent = $('#' + this._id);
    
    this._renderer.resize(_parent.width(), _parent.outerHeight());
  }
}
export = PixiStage;