class Event  {
  public data:any = {};
  public timeStamp:number;
  public defaultPrevented:boolean = false;
  
  public static COMPLETE:string = "complete";
  public static INIT    :string = "init";
  public static CHANGE  :string = "change";
  public static RESIZE  :string = "resize";
  public static SCROLL  :string = "scroll";
  public static REMOVED :string = "removed";
  public static SUCCESS :string = "success";
  public static ERROR   :string = "error";
  public static IO_ERROR :string = "error";
  
  constructor(public type:string) {
    this.timeStamp = Date.now();
  }
  
  preventDefault() {
    this.defaultPrevented = true;
  }
}
export = Event;