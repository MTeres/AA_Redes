'use strict';

var _comunication = require('../scripts/comunication');

var comunication = _interopRequireWildcard(_comunication);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function ($) {
  $(document).ready(function () {
    comunication.bind_events();
  });
})(jQuery); // aqui agruparei os membros exportados