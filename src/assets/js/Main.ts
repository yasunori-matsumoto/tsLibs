import EventDispatcher = require('ex/events/EventDispatcher');
import Event = require('ex/events/Event');
import Loader = require('ex/network/Loader');
import DisplayObject = require('ex/display/DisplayObject');
import _d = require('ex/core/Dom');

var log = (_state:any):void => {
  console.log(_state);
};

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


var ob = new MutationObserver(function(recs){
  console.log(recs);
});

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}

ready(function() {
  FastClick.attach(document.body);
  new Sample();
});
  
class Sample extends EventDispatcher {
  private _loader:any
  constructor() {
    super();
    this._loader = new Loader();
    this._loader.addEventListener(Event.COMPLETE, this.loadComplete);
    this._loader.load({url:'json/dealer.json'});
    
    ob.observe(document.querySelector('#test'),{
      childList:true
    });
    
    var _aaa = document.createElement('div');
    _aaa.id = 'testtest';
    _aaa.innerHTML = '<p></p>';
    document.getElementById('test').appendChild(_aaa);
    
    var _bbb = document.createElement('div');
    _bbb.id = 'testtest2';
    _bbb.innerHTML = '<p></p>';
    document.getElementById('test').appendChild(_bbb);
    
    _d.remove(document.getElementById('testtest'));
  }
  
  loadComplete = (e:any):void => {
    console.log(this._loader.content);
    this._loader = void 0;
  }
}


