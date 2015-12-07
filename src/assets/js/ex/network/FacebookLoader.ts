class FacebookLoader {
  private _token:string = "";
  private _user:string = "";
  constructor() {
    super();
    this.checkAPI();
  }
  
  checkAPI = ():void => {
    if (window.apiLoaded) {
      this.loadNews();
      return;
    }
    setTimeout(this.checkAPI, 500);
  }
  
  loadNews = ():void => {
    var _self = this;
    window.FB.api(this._user + '/posts',
      {
        limit: 20,
        fields: 'message,link,picture,is_hidden,created_time,updated_time',
        access_token: this._token
      },
      function(response) {
        return response;
      }
    );
  }
}
export = FacebookLoader;