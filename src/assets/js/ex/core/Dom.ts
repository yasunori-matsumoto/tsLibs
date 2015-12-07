class _d {
  public static el = (_selector:string):any => {
    if (_selector.indexOf('#') >= 0) {
      return document.querySelector(_selector);
    } else {
      return document.querySelectorAll(_selector);
    }
  }

//- -----------------------------------------------------------  <
// $('#myParent').children();
// // IE 9+ (ignores comment & text nodes).
// document.getElementById('myParent').children;
//- -----------------------------------------------------------  <
  
  
  //- . . . . . . . . . . . . . . .  . . . Positions / Size <
  public static offset = (_elem:any):any => {
    var rect = _elem.getBoundingClientRect()
    
    return {top: rect.top + document.body.scrollTop, left: rect.left + document.body.scrollLeft};
  }
  
  public static position = (_elem:any):any => {
    return {left: _elem.offsetLeft, top: _elem.offsetTop};
  }
  
  public static outerHeight = (_elem:any):number => {
    return _elem.offsetHeight;
  }
  
  public static outerWidth = (_elem:any):number => {
    return _elem.offsetWidth;
  }
  
  //- . . . . . . . . . . . . . . .  . . . class <
  public static addClass = (_elem:any, _class:string):void => {
    _elem.classList.add(_class);
  }
  
  public static removeClass = (_elem:any, _class:string):void => {
    _elem.classList.remove(_class);
  }
  
  public static hasClass = (_elem, _className:string):any => {
    if (_elem.classList)
      return _elem.classList.contains(_className);
    else
      return new RegExp('(^| )' + _className + '( |$)', 'gi').test(_elem._className);
  }
  
  public static toggle = (_elem:any):void => {
    if (_elem.className.indexOf('active') >= 0)
      _d.removeClass(_elem, 'active');
    else
      _d.addClass(_elem, 'active');
  }
  
  //- . . . . . . . . . . . . . . .  . . . Attributes <
  public static setAttr = (_elem:any, _attr:string, _param:string):void => {
    _elem.setAttribute(_attr, _param);
  }
  
  public static getAttr = (_elem:any, _attr:string):string => {
    return _elem.getAttribute(_attr);
  }
  
  public static removeAttr = (_elem:any, _attr:string):void => {
    _elem.removeAttribute(_attr);
  }
  
  //- . . . . . . . . . . . . . . .  . . . texts <
  public static text = (_elem:any, _text:string):void => {
    _elem.textContent = _text;
  }
  
  //- . . . . . . . . . . . . . . .  . . . Dom Manipulation <
  public static killEvent = (_elem:any):void => {
    var new_element = _elem.cloneNode(true);
    _elem.parentNode.replaceChild(new_element, _elem);
  }
  
  public static Empty = (_elem:any):void => {
    while (_elem.firstChild)
      _elem.removeChild(_elem.firstChild);
  }
  
  public static Before = (_parent:any, _node:any):void => {
    _parent.insertAdjacentHTML('afterbegin', _node);
  }
  
  public static After = (_parent:any, _node:any):void => {
    _parent.insertAdjacentHTML('afterend', _node);
  }
  
  public static remove = (_elem:any):void => {
   _d.killEvent(_elem);
    _elem.parentNode.removeChild(_elem);
  }
  
  public static Clone = (_elem:any):any => {
    return _elem.cloneNode(true);
  }
}
export = _d;

//   Each = (_selector:string, _fn:Function):void => {
//     var elements = document.querySelectorAll(_selector);
//     var i:number = 0;
//     for(i=0; i<elements.length; i++) {
//       _fn(_selector[i], i)
//     }
//   }
