import EventDispatcher = require('ex/events/EventDispatcher');

class DisplayObject extends EventDispatcher {
  protected _style:any;
  protected _visible   :boolean = true;
  protected _buttonMode:boolean = true;
  protected _scaleX    :number = 1;
  protected _scaleY    :number = 1;
  protected _alpha     :number = 1;
  protected _width     :number = 0;
  protected _height    :number = 0;
  protected _rotation  :number = 0;
  protected _rotationX :number = 0;
  protected _rotationY :number = 0;
  protected _rotationZ :number = 0;
  protected _x         :number = 0;
  protected _y         :number = 0;
  protected _zIndex    :number = 0;
  protected _position : string = 'relative';
  
  constructor(public _node:any) {
    super(_node);
    this._style = this._node.style;
    this._width = this._node.offsetWidth;
    this._height = this._node.offsetHeight;
  }
  
  velocity = (_param:any, _options:any):void => {
    Velocity(this._node, _param, _options)
  }
  
  stop = ():void => {
    Velocity(this._node, 'stop');
  }
  
  vcss = (_param:any):void => {
    for (var key in _param) {
      Velocity.hook(this._node, key, _param[key]);
    }
  }
  
  reset = ():void => {
    this._node.removeAttribute("style");
  }
  
  dispose = ():void => {
    Velocity(this._node, 'stop');
    this._node.removeAttribute('style');
    this.clearEventListener();
    this._node       = void 0;
    this._style      = void 0;
    this._visible    = void 0;
    this._buttonMode = void 0;
    this._scaleX     = void 0;
    this._scaleY     = void 0;
    this._alpha      = void 0;
    this._width      = void 0;
    this._height     = void 0;
    this._rotation   = void 0;
    this._rotationX  = void 0;
    this._rotationY  = void 0;
    this._rotationZ  = void 0;
    this._x          = void 0;
    this._y          = void 0;
    this._zIndex     = void 0;
  }
  
  reflow = ():void => {
    this._node.style.display = 'none';
    this._node.offsetHeight;
    this._node.style.display = 'block';
  }
  
  //- . . . . . . . . . . . . . . .  . . . visible <
  get visible():boolean {
    return this._visible;
  }
  
  set visible(_state:boolean) {
    this._visible = _state;
    this._style.display = _state ? "block" : "none";
  }
  
  //- . . . . . . . . . . . . . . .  . . . abs <
  set position(_position:string) {
    this._position = _position;
    this._style.position = _position;
  }
  
  //- . . . . . . . . . . . . . . .  . . . x <
  get x():number {
    return this._x;
  }
  
  set x(_num:number) {
    this._x = _num;
    this._style.left = _num + 'px';
  }
  
  //- . . . . . . . . . . . . . . .  . . . y <
  get y():number {
    return this._y;
  }
  
  set y(_num:number) {
    this._y = _num;
    this._style.top = _num + 'px';
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
    this.vcss({rotateZ : _rotation + "deg"});
  }
  
  //- . . . . . . . . . . . . . . .  . . . rotationX <
  get rotationX():number {
    return this._rotationX;
  }
  
  set rotationX(_rotation:number) {
    this._rotationX = _rotation;
    this.vcss({rotateX : _rotation + "deg"});
  }
  
  //- . . . . . . . . . . . . . . .  . . . rotationY <
  get rotationY():number {
    return this._rotationY;
  }
  
  set rotationY(_rotation:number) {
    this._rotationY = _rotation;
    this.vcss({rotateY : _rotation + "deg"});
  }
  //- . . . . . . . . . . . . . . .  . . . rotationZ <
  get rotationZ():number {
    return this._rotationZ;
  }
  
  set rotationZ(_rotation:number) {
    this._rotationZ = _rotation;
    this.vcss({rotateZ : _rotation + "deg"});
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
  
  //-  zindex
  get childIndex():number {
    return this._zIndex;
  }
  
  set childIndex(_num:number) {
    this._zIndex = _num;
    this._style['z-index'] = _num;
  }
}
export = DisplayObject;