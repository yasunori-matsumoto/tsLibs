import AlphaBtn = require(ex/utils/AlphaBtn);
import EventDispatcher = require(ex/events/Events);

class AlphaBtnSetter extends EventDispatcher {
  constructor() {
    super();
    $('.alpha_btn').each(function() {
      new AlphaBtn($(this));
    });
  }
}