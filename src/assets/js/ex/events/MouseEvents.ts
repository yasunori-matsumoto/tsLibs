module MouseEvent {
  export var CLICK     :string = "click";
  export var MOUSE_DOWN:string = ("ontouchstart" in window) ? "touchstart" : "mousedown";
  export var MOUSE_UP  :string = ("ontouchend" in window) ? "touchend" : "mouseup";
  export var MOUSE_MOVE:string = ("ontouchmove" in window) ? "touchmove" : "mousemove";
  export var MOUSE_OVER:string = "mouseenter";
  export var MOUSE_OUT :string = "mouseleave";
}
export = MouseEvent;