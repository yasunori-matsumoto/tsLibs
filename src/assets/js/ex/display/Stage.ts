export module Stage {
  export function width():number {
    return window.innerWidth || document.documentElement.clientWidth || 0;
  }
  export function height():number {
    return window.innerHeight || document.documentElement.clientHeight || 0;
  }
  export function isSp():boolean {
    var ua = navigator.userAgent;
    if (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1)  return true;
    if (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)  return true;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0) return true;
    return false;
  }
}
