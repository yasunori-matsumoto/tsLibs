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
}

window.requestAnimFrame = (():any => {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback:any){
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
  function(id:any) { window.clearTimeout(id); };
})();