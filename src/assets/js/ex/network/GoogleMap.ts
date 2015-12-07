class GoogleMap {
  private _js:any;
  private _gmap:any;
  private _latLng:any;
  private _options:any = {
    zoom : 17
  };
  private _id:string = 'googlemap';
  private _markerSrc:string = '';
  private _marker:any;
  
  constructor(_options:any) {
    //-  options
    if (_options.zoom) this._options.zoom = _options.zoom;
    if (_options.id) this._id             = _options.id;
    if (_options.marker) this._markerSrc  = _options.marker;
    
    //-  addScript
    if (document.getElementById(google_map_api))  return;
    this._js = document.createElement('script');
    this._js.id = 'google_map_api';
    this._js.src = '//maps.googleapis.com/maps/api/js?sensor=false';
    var _fjs = document.getElementsByTagName('script')[0];
    _fjs.parentNode.insertBefore(this._js, _fjs);
  }
  
  public AddMap = (_lat:any):void => {
    this._latLng = _lat;
    var _options = {
      zoom               : 17,
      center             : this._latLng,
      mapTypeId          : google.maps.MapTypeId.ROADMAP,
      panControl         : false,
      streetViewControl  : false,
      zoomControl        : true,
      mapTypeControl     : false,
      scaleControl       : true,
      scaleControlOptions: { position: google.maps.ControlPosition.BOTTOM_LEFT },
      overviewMapControl : false,
      draggable          : true,
      scrollwheel        : false,
      noClear : true
    }
    this._gmap = new google.maps.Map(document.getElementById(this._id));
    
    if (this._markerSrc.length === 0) return;
    this._marker = new google.maps.Marker({
      position : this._latLng,
      map      : this._gmap,
      icon     : this._markerSrc
    });
  }
}
export = GoogleMap;