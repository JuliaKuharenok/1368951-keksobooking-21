'use strict';

(function () {
  window.util = {
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    random: function (array) {
      const randomItem = array[Math.floor(Math.random() * array.length)];
      return randomItem;
    },
  };
})();
