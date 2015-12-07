
class fileSizeChecker {
  constructor() {
    super();
    var _self = this;
    $('.fileSizeGet').each(function() {
      var _node = $(this);
      var _href = _node.attr('href');
      if (_href.match(/\.(TXT|CSV|PDF|MP3|ISO|ZIP|7Z|LZH|RAR|EXE|DMG|SIT|TAR|GZ|DOC|DOCX|XLS|XLSX|PPT|PPTX|MOV|AVI|MP4|WMV|MSI|MSP|SWF)$/i)) {

        var ext = RegExp.$1;
        var _req = $.ajax({
          type: 'HEAD',
          url: _href,
          success: function(){
            var size = _req.getResponseHeader('Content-Length');
            if (size) {
              size = _self.unit(size);
              var _dot = _href.lastIndexOf(".");
              var _extension = _href.substring(_dot+1, _href.length);
              _extension = _extension.toUpperCase();
              
              if (_extension === 'DOCX' || _extension === 'DOC') _extension = 'WORD';
              if (_extension == 'XLSX' || _extension == 'XLS') _extension = 'excel';
              
              _node.append('(' + _extension + ':' + size + ')');
            }
          }
        });
      }
    });
  }

  format = (val):string => {
    var s = '' + val;
    if (s.length > 3) {
      var r = ((r = s.length % 3) == 0 ? 3 : r);
      var d = s.substring(r);
      s = s.substr(0, r) + d.replace(/(\d{3})/g, ",$1");
    }
    return s;
  }

  unit = (_byte):string => {
    var unit = ['KB','MB','GB','TB','PB','EB','ZB','YB'];
    if (_byte < 1024) return _byte + 'B';

    for (var i = 0; i < unit.length; i++) {
      _byte /= 1024;
      if (_byte < 1024) {
        if (_byte >= 100)
          return this.format(Math.round(_byte)) + unit[i];
        else
          return Math.round(_byte*10)/10 + unit[i];
      }
    }
  }
}

export = fileSizeChecker;