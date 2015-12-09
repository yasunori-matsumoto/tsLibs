interface Window {
  webkitRequestAnimationFrame():void;
  mozRequestAnimationFrame():void;
  oRequestAnimationFrame():void;
  msRequestAnimationFrame():void;
  requestAnimFrame(_callback:any):any;
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
  WebKitCSSMatrix():any;
  FB:any;
  apiLoaded:boolean;
  log(_state:any):any;
  FastClick():any;
  CustomEvent:any;
}

interface Document {
  attachEvent(event: string, listener: EventListener): boolean;
}

declare class EventDispatcher {
  public addEventListener(types:string, listener:any):void;
}