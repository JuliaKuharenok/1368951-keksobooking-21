'use strict';

(function () {
  const form = document.querySelector(`.ad-form`);
  const photoDrop = form.querySelector(`.ad-form-header`);
  const formFieldsets = form.querySelectorAll(`.ad-form__element`);
  const addressInput = form.querySelector(`#address`);

  const getPageActive = function () {
    window.pins.map.classList.remove(`map--faded`);

    form.classList.remove(`ad-form--disabled`);

    photoDrop.removeAttribute(`disabled`, `disabled`);

    for (let i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute(`disabled`, `disabled`);
    }

    addressInput.value = (Math.round(window.pins.MAIN_PIN_LEFT + window.pins.xShiftMain)) + ` , ` + (window.pins.MAIN_PIN_TOP + window.pins.yShiftMain);

    const pinFragment = document.createDocumentFragment();
    for (let i = 0; i < window.pins.advertisments.length; i++) {
      pinFragment.appendChild(window.pins.renderPin(window.pins.advertisments[i]));
    }
    window.pins.pins.appendChild(pinFragment);
  };

  photoDrop.setAttribute(`disabled`, `disabled`);

  for (let i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute(`disabled`, `disabled`);
  }

  addressInput.value = window.pins.MAIN_PIN_LEFT + ` , ` + window.pins.MAIN_PIN_TOP;

  window.pins.mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt[`which`] === 1) {
      getPageActive();
    }
  });
})();
