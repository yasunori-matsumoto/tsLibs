import EventDispatcher = require('ex/events/EventDispatcher');
import Event           = require('ex/events/Event');

class Loader extends EventDispatcher {
  public content:any;
  private request:any;
  public method:string = 'GET';
  public type:string = "json";
  
  constructor() {
    super();
  }
  
  load = (_param:any = null):void => {
    var _self = this;
    this.request = new XMLHttpRequest();
    
    this.request.open(this.method, _param.url, true);
    var _sendData = {};
    
    if (_param.data === void 0) { _param.data = {}; };
    
    if (this.method.toUpperCase() === 'POST') {
      this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    
    this.request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          _self.content = this.responseText;
          if (_self.type.indexOf('json') >= 0) {
            _self.content = JSON.parse(_self.content);
          }
          _self.dispatchEvent(Event.COMPLETE);
        } else {
          _self.dispatchEvent(Event.ERROR)
        }
      }
    };
    this.request.send(_param.data);
    this.request = null;
  }
  
  unload = ():void => {
    this.content = void 0;
  }
  
  close = ():void => {
    this.request.abort();
    this.request.removeEventListener('onreadystatechange');
    this.request = void 0;
  }
}
export = Loader;