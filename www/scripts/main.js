// aqui agruparei os membros exportados
import * as comunication from '../scripts/comunication'

(($) => {
  $(document).ready(() => {
  	comunication.bind_events()
  });
})(jQuery);