// import EventDispatcher = require('ex/events/EventDispatcher');
// import Event = require('ex/events/Event');
import MouseEvent = require('ex/events/MouseEvent');
import Loader = require('ex/network/Loader');
import DevelopMain = require('caters/develop/Main');

// import Jade = require("jade!./jade/test.jade");

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
  console.log('main');
  FastClick.attach(document.body);
  // new Sample();
  new DevelopMain();
  // new PixiDevelop();
});