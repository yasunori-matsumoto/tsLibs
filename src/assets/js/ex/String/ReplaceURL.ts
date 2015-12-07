ReplaceURL = (_text:string):string => {
  return _text.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a>'));
}

export = ReplaceURL;