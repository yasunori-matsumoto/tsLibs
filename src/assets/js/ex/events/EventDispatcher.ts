import Event = require('ex/events/Event');

class EventDispatcher {
  private _listeners:any = {};
  addEventListener(types:string, listener:(e:Event) => any):void {
    var typeList:string[] = types.split(/\s+/);
    var i:number = 0;
    var l:number = typeList.length;
    for (; i < l; i++) {
        this._listeners[typeList[i]] = listener;
    }
  }
  removeEventListener(types:string, listener?:Function):void {
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
  dispatchEvent(type:string, data:Object = {}, context:any = this):boolean {
    var listener:Function;
    if (listener = this._listeners[type]) {
      var e:Event = new Event(type);
      e.data = data;
      listener.call(context, e);
    }
    return true;
  }
  
  clearEventListener():void {
    this._listeners = {};
  }
}
export = EventDispatcher;