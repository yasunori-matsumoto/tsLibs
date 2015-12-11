class MouseEvent {
  public static get CLICK()     :string {return "click"};
  public static get MOUSE_DOWN():string {return ("ontouchstart" in window) ? "touchstart" : "mousedown"};
  public static get MOUSE_UP()  :string {return ("ontouchend" in window) ? "touchend" : "mouseup"};
  public static get MOUSE_MOVE():string {return ("ontouchmove" in window) ? "touchmove" : "mousemove"};
  public static get MOUSE_OVER():string {return 'mouseenter'};
  public static get MOUSE_OUT() :string {return 'mouseleave'};
}
export = MouseEvent;