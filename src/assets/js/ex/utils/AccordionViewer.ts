import Ease = require(ex/easing/Ease);
 class AccordionViewer {
  private _isOpen:boolean = true;
  
  public _node:any;
  private _trigger:any;
  private _view:any;
  private _inner:any;
  
  constructor(public _options:any = null) {
    super();
    if (!_options)  return;
    
    this._node    = _options._node;
    this._view    = this._node.find(".view");
    this._trigger = this._node.find(".btn_toggle");
    this._inner   = this._node.find(".accordion_inner");
    
    this._trigger.bind("click", this.toggleHD);
    
    if (this._node.attr('data-default')) {
      this.jadgeDefault();
    }
  }
  
  jadgeDefault = ():void => {
    this._isOpen = this._node.attr('data-default') === 'open';
    if (!this._isOpen) {
      this._trigger.addClass("active");
      this._view.velocity("stop").velocity({height:0}, {duration:0, delay:0, easing:Ease.EaseInOutCubic});
    }
  }
  
  toggleHD = ():void => {
    this._isOpen = !this._isOpen;
    this._isOpen ? this.show() : this.hide();
  }
  
  show = ():void => {
    this._trigger.removeClass("active");
    this._view.velocity("stop").velocity({height:this._inner.outerHeight()}, {duration:500, delay:0, easing:Ease.EaseInOutCubic});
  }
  
  hide = ():void => {
    this._trigger.addClass("active");
    this._view.velocity("stop").velocity({height:0}, {duration:500, delay:0, easing:Ease.EaseInOutCubic});
  }
}
export = AccordionViewer;