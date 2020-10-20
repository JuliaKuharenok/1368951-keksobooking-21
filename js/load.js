'use strict';

(function () {
  var URL = 'https://21.javascript.pages.academy/keksobooking/data';
  
  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.open('GET', URL);
    
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    
    xhr.send();
  };
})();