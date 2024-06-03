// globalDirectives.js
import vClickOutside from 'v-click-outside';

const GlobalDirectives = {
  install(app) {
    app.directive('click-outside', vClickOutside.directive);
  },
};

export default GlobalDirectives;
