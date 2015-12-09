import Event = require('ex/events/Event');

class EventDispatcher {
  public _listeners:any = {};
  
  constructor(public _target:any = null) {
  }
  
  public addEventListener = (types:string, listener:any, useCapture:boolean = false):void => {
    if (this._target) {
      this._target.addEventListener(types, listener, useCapture);
      return;
    }
    
    var typeList:string[] = types.split(/\s+/);
    var i:number = 0;
    var l:number = typeList.length;
    
    for (; i < l; i++) {
      this._listeners[typeList[i]] = listener;
    }
  }
  
  public removeEventListener = (types:string, listener?:Function):void => {
    if (this._target) {
      this._target.removeEventListener(types, listener);
      return;
    }
    
    var typeList:string[] = types.split(/\s+/);
    var i:number = 0;
    var l:number = typeList.length;
    var type:string;
    for (; i < l; i++) {
        type = typeList[i];
        if (listener == null || this._listeners[type] === listener) {
            delete this._listeners[type];
        }
    }
  }
  public dispatchEvent = (type:string, data:Object = {}, context:any = this):boolean => {
    if (this._target) {
      if (window.CustomEvent) {
        var event = new CustomEvent(type, data);
      } else {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, true, true, data);
      }
      this._target.dispatchEvent(event);
      return;
    }
    
    var listener:Function;
    if (listener = this._listeners[type]) {
      var e:Event = new Event(type);
      e.data = data;
      listener.call(context, e);
    }
    return true;
  }
  
  public clearEventListener = ():void => {
    this._listeners = {};
  }
}
export = EventDispatcher;