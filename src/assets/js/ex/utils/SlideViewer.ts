import Event = require('ex/events/Event');
import MouseEvent = require('ex/events/MouseEvents');
import Ease = require('ex/easing/Ease');


class SlideViewer {
  //-  node
  private _node:any;
  private _slideView:any;
  private _slideList:any;
  private _style:any;
  
  private _navigation:any;
  private _indicator:any;
  
  private _btnPrev:any;
  private _btnNext:any;
  private _btnPause:any;
  private _indicatorTotal:any;
  private _indicatorCurrent:any;
  
  
  //- flag
  private _hasNavigation:boolean = false;
  private _hasIndicator :boolean = false;
  private _isPause      :boolean = false;
  private _isAutoSlide  :boolean = false;
  private _isLoop       :boolean = false;
  private _isSnap       :boolean = false;
  
  //- variables
  private _autoTime     :number  = 5000;
  private _startTime    :number  = 0;
  private _endTime      :number  = 0;
  
  private _offsetX      :number  = 0;
  private _velocityX    :number  = 0;
  private _currentX     :number  = 0;
  
  private _needsW       :number  = 0;
  private _slideSpan    :number  = 0;
  private _padding      :number  = 0;
  private _maxSlide     :number  = 0;
  private _prevSlide    :number  = 0;
  private _currentSlide :number  = 0;
  
  private _startTouch   :number  = 0;
  private _currentTouch :number  = 0;
  private _prevTouch    :number  = 0;
  private _endTouch     :number  = 0;
  
  private _autoTimer:any;
  private _slideTimer:any;
  
  private _captureCount:number = 0;
  private _captureX:number = 0;
  private _captureY:number = 0;
  
  private dispatcher:any;
  
  
  constructor(public _options=null) {
    this.dispatcher = $(window);
    
    if (_options._node === void 0) return;
    if (_options.slideSpan === void 0) {
      this.dispatcher.bind(Event.RESIZE, _.debounce(this.onResizeHD, 200));
    };
    if (_options.autoTime)  this._autoTime = _options.autoTime;
    if (_options.padding)  this._padding = _options.padding;
    
    this._isAutoSlide = _options.auto;
    this._isLoop      = _options.loop;
    this._isSnap      = _options.snap;
    
    this._node = _options._node;
    this._slideView  = this._node.find(".slide_view");
    this._slideList  = this._node.find(".slide_list");
    this._navigation = this._node.find(".slide_navigation");
    this._indicator  = this._node.find(".indicator");
    
    this._maxSlide = this._slideList.find(">li").length;
    this._style = this._slideList.get(0).style;

    if (_options.slideSpan === void 0) {
      this.onResizeHD();
    } else {
      this._slideSpan = _options.slideSpan;
    }
    this.setup();
  }
  
  setup = ():void => {
    var _self = this;
    this._needsW = this._slideSpan * this._maxSlide;
    this._slideList.css({width:this._needsW});
    if (this._isLoop) this.setUpLoop();
    this._slideList.bind(MouseEvent.MOUSE_DOWN, this.startFlick);
    this.onSlideChange();
    this.setSlidePosition();
    this._slideView.velocity("stop");
    // if (this._isAutoSlide)  this._autoTimer = setInterval(this.autoSlide, this._autoTime);
    
    if (this._navigation.length === 0)  return;
    this._hasNavigation = true;
    this._btnPrev  = this._node.find(".btn_prev");
    this._btnNext  = this._node.find(".btn_next");
    this._btnPause = this._node.find(".btn_pause");
    
    this._btnPause.bind(MouseEvent.MOUSE_DOWN, this.pauseHD);
    this._btnPrev.bind(MouseEvent.MOUSE_DOWN, this.prevHD);
    this._btnNext.bind(MouseEvent.MOUSE_UP, this.nextHD);
    
    if (this._indicator.length === 0)  return;
    this._hasIndicator     = true;
    this._indicatorTotal   = this._node.find(".total");
    this._indicatorCurrent = this._node.find(".current");
    this._indicatorTotal.text(this._maxSlide);
    this._indicatorCurrent.text(this._currentSlide + 1);
  }
  
  pauseHD = ():void => {
    this._isPause = !this._isPause;
    this._isPause ? this._btnPause.addClass("active") : this._btnPause.removeClass("active");
  }
  
  prevHD = ():void => {
    if (this._slideTimer) window.cancelAnimFrame(this._slideTimer);
    if (this._autoTimer) clearInterval(this._autoTimer);
    this._slideList.velocity("stop");
    
    this._currentSlide --;
    if (this._currentSlide < 0) {
      this._currentSlide = this._maxSlide-1;
      this._currentX -= this._needsW;
      this.setSlidePosition();
    }
    this._slideTimer = window.requestAnimFrame(this.onSlideChange);
  }
  
  nextHD = ():void => {
    if (this._slideTimer) window.cancelAnimFrame(this._slideTimer);
    if (this._autoTimer) clearInterval(this._autoTimer);
    this._slideList.velocity("stop");
    
    this._currentSlide ++;
    if (this._currentSlide >= this._maxSlide) {
      this._currentSlide = 0;
      this._currentX += this._needsW;
      this.setSlidePosition();
    }
    this._slideTimer = window.requestAnimFrame(this.onSlideChange);
  }
  
  onResizeHD = ():void => {
    var _self = this;
    this._slideSpan = $("#contents_contaienr").width() - this._padding;
    this._needsW = this._slideSpan * this._maxSlide;
    
    if (this._isLoop) {
      this._slideList.css({width:this._needsW*3});
      this._offsetX = -this._needsW;
      this._currentX = this._offsetX;
    }
    
    this._slideList.find(">li").each(function() {
      $(this).css({width:_self._slideSpan});
    });
    this.onSlideChange();
    this.setSlidePosition();
  }
  
  setUpLoop = ():void => {
    this._offsetX = -this._needsW;
    this._currentX = this._offsetX;
    this._slideList.css({transform:"translate(0px 0px)"});
    var _dummy = this._slideList.html();
    this._slideList.append(_dummy);
    this._slideList.append(_dummy);
    this._slideList.css({width:this._needsW*3});
    this.setSlidePosition();
  }
  
  startFlick = (e):void => {
    if (this._slideTimer) window.cancelAnimFrame(this._slideTimer);
    if (this._autoTimer) clearInterval(this._autoTimer);
    this._slideList.velocity("stop");
    
    //-
    this._startTime = new Date().getTime();
    this._startTouch = MouseEvent.MOUSE_DOWN === "touchstart" ?  e.originalEvent.touches[0].clientX : e.originalEvent.pageX;
    
    this._captureCount = 0;
    this._captureX =  MouseEvent.MOUSE_DOWN === "touchstart" ?  e.originalEvent.touches[0].clientX : e.originalEvent.pageX;
    this._captureY =  MouseEvent.MOUSE_DOWN === "touchstart" ?  e.originalEvent.touches[0].clientY : e.originalEvent.pageY;
    
    this.dispatcher.bind(MouseEvent.MOUSE_MOVE, this.captureDirection);
    
    return;
    
    this._startTime = new Date().getTime();
    this._startTouch = MouseEvent.MOUSE_DOWN === "touchstart" ?  e.originalEvent.touches[0].clientX : e.originalEvent.pageX;
    this._currentTouch = this._startTouch;
    this._prevTouch = this._startTouch;
    
    this.dispatcher.bind(MouseEvent.MOUSE_UP, this.stopFlick);
    this.dispatcher.bind(MouseEvent.MOUSE_MOVE, this.flicking);
    
    if (MouseEvent.MOUSE_DOWN === "mousedown") e.preventDefault();
  }
  
  captureDirection = (e):void => {
    this._captureCount ++;
    // console.log(this._captureCount);
    if (this._captureCount > 5) {
      this.dispatcher.unbind(MouseEvent.MOUSE_MOVE, this.captureDirection);
      var _captureEndX =  MouseEvent.MOUSE_DOWN === "touchstart" ?  e.originalEvent.touches[0].clientX : e.originalEvent.pageX;
      var _captureEndY =  MouseEvent.MOUSE_DOWN === "touchstart" ?  e.originalEvent.touches[0].clientY : e.originalEvent.pageY;
      
      var _jadgeX = Math.abs(_captureEndX - this._captureX);
      var _jadgeY = Math.abs(_captureEndY - this._captureY);
      
      if (_jadgeX > _jadgeY) {
        this._startTime = new Date().getTime();
        this._startTouch = MouseEvent.MOUSE_DOWN === "touchstart" ?  e.originalEvent.touches[0].clientX : e.originalEvent.pageX;
        this._currentTouch = this._startTouch;
        this._prevTouch = this._startTouch;
        
        this.dispatcher.bind(MouseEvent.MOUSE_UP, this.stopFlick);
        this.dispatcher.bind(MouseEvent.MOUSE_MOVE, this.flicking);
        
        // if (MouseEvent.MOUSE_DOWN === "mousedown") e.preventDefault();
      } else {
        if (this._isAutoSlide) {
          this._autoTimer = setInterval(this.autoSlide, this._autoTime);
        }
      }
    }
  }
  
  
  
  flicking = (e):void => {
    if (this._autoTimer) clearInterval(this._autoTimer);
    this._prevTouch = this._currentTouch;
    this._currentTouch = MouseEvent.MOUSE_MOVE === "touchmove" ? e.originalEvent.touches[0].clientX : e.originalEvent.pageX;
    
    var _diff = this._prevTouch - this._currentTouch;
    this._currentX -= _diff;
    
    this._isLoop ? this.jadgeLoop() : this.setSlideMax();
  }
  
  stopFlick = (e):void => {
    this.dispatcher.unbind(MouseEvent.MOUSE_UP, this.stopFlick);
    this.dispatcher.unbind(MouseEvent.MOUSE_MOVE, this.flicking);
    
    this._endTime = new Date().getTime();
    this._endTouch = MouseEvent.MOUSE_UP === "touchend" ? e.originalEvent.changedTouches[0].clientX : e.originalEvent.pageX;
    
    if (!this._isSnap) {
      var _moveRatio = 1 - (this._endTime - this._startTime)/200;
      _moveRatio = Math.max(0, _moveRatio);
      this._velocityX = (this._endTouch - this._startTouch) * _moveRatio;
      this._slideTimer = window.requestAnimFrame(this.accelHD);
    } else {
      if (this._isLoop) {
        this.jadgeLoop();
      }
      
      if (this._endTouch > this._startTouch) {
        this._currentSlide --;
        
        if (!this._isLoop)  this._currentSlide = Math.max(0, this._currentSlide);
        
        if (this._currentSlide < 0) {
           this._currentSlide = this._maxSlide-1;
           this._currentX -= this._needsW;
           this.setSlidePosition();
        }
      }
      
      if (this._endTouch < this._startTouch) {
        this._currentSlide ++;
        
        if (!this._isLoop)  this._currentSlide = Math.min(this._maxSlide-1, this._currentSlide);
        
        if (this._currentSlide >= this._maxSlide) {
          this._currentSlide = 0;
           this._currentX += this._needsW;
           this.setSlidePosition();
        }
      }
      
      this._slideTimer = window.requestAnimFrame(this.onSlideChange);
      
      if (this._isAutoSlide) {
        this._autoTimer = setInterval(this.autoSlide, this._autoTime);
      }
    }
  }
  
  accelHD = ():void => {
    this._velocityX *= 0.9;
    this._currentX += this._velocityX;
    
    this._isLoop ? this.jadgeLoop() : this.setSlideMax();
    
    this._currentSlide = this.getCurrentSlide();
    if (this._hasNavigation) this.setNavigation();
    this.setSlidePosition();
    
    if (Math.abs(this._velocityX) < 0.5) {
      if (this._isAutoSlide) {
        this._autoTimer = setInterval(this.autoSlide, this._autoTime);
      }
    } else {
      this._slideTimer = window.requestAnimFrame(this.accelHD);
    }
  }
  
  setSlideMax = ():void => {
    this._currentX = Math.min(0, this._currentX);
    this._currentX = Math.max(this._slideView.width() - this._needsW, this._currentX);
  }
  
  
  autoSlide = ():void => {
    if (this._isPause)  return;
    
    this._currentSlide ++;
    if (this._currentSlide >= this._maxSlide) {
      this._currentSlide = 0;
      this._currentX += this._needsW
      this.setSlidePosition();
    }
    
    this._slideTimer = window.requestAnimFrame(this.onSlideChange);
  }
  
  onSlideChange = ():void => {
    var _gotoX = this._offsetX - (this._slideSpan * this._currentSlide);
    
    if (!this._isLoop) {
      _gotoX = Math.max(this._slideView.width() - this._needsW, _gotoX);
      _gotoX = Math.min(0, _gotoX);
    }
    this._slideList.velocity("stop").velocity({translateX:_gotoX}, {duration:800, delay:0, easing:Ease.EaseInOutCubic, progress:this.onVelocityProgress});

    if (this._isAutoSlide) {
      clearInterval(this._autoTimer);
      this._autoTimer = setInterval(this.autoSlide, this._autoTime);
    }
    
    if (this._hasIndicator) {
      this._indicatorTotal.text(this._maxSlide);
      this._indicatorCurrent.text(this._currentSlide + 1);
    }
  }
  
  onVelocityProgress = (e):void => {
    this._currentX = this.getCurrentPosition();
    this._currentSlide = this.getCurrentSlide();
    if (this._hasNavigation) this.setNavigation();
  }
  
  jadgeLoop = ():void => {
    if (this._currentX < this._offsetX- this._slideSpan/2) {
      this._currentX += this._needsW;
    }
    
    if (this._currentX > this._offsetX + this._slideSpan/2) {
      this._currentX -= this._needsW;
    }
    this.setSlidePosition();
  }
  
  getCurrentSlide = ():number => {
    var _slide = Math.abs(Math.round((this._currentX - this._offsetX)/this._slideSpan));
    if (_slide === this._maxSlide)  _slide = 0;
    
    if (_slide != this._currentSlide) {
      this._currentSlide = _slide;
    }
    return _slide;
  }
  
  setSlidePosition = ():void => {
    $.Velocity.hook(this._slideList, 'translateX',  this._currentX + 'px');
    
    // this._slideList.velocity("stop").velocity({translateX:this._currentX}, 0);
  }
  
  getCurrentPosition = ():number => {
    
    return window.WebKitCSSMatrix ? new WebKitCSSMatrix(this._style.webkitTransform).e : Number(this._style.transform.match(/translateX\((.+)px\)/)[1]);
  }
  
  setNavigation = ():void => {
    // var i:number = 0;
    // for (i=0; i<this._naviList.length; i++) {
    //   i === this._currentSlide ? this._naviList[i].addClass("active") : this._naviList[i].removeClass("active");
    // }
  }
}
export = SlideViewer;