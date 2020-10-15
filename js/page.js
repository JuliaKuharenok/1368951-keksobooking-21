'use strict';

(function () {
  const photoDrop = window.form.form.querySelector(`.ad-form-header`);
  const formFieldsets = window.form.form.querySelectorAll(`.ad-form__element`);
  const addressInput = window.form.form.querySelector(`#address`);

  const getPageActive = function () {
    window.pins.map.classList.remove(`map--faded`);
    window.form.form.classList.remove(`ad-form--disabled`);
    photoDrop.removeAttribute(`disabled`);

    for (let i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute(`disabled`);
    }

    addressInput.value = (Math.round(window.pins.mainPin.offsetLeft + window.pins.xShiftMain)) + ` , ` + (window.pins.mainPin.offsetTop + window.pins.yShiftMain);

    const pinFragment = document.createDocumentFragment();
    for (let i = 0; i < window.pins.advertisments.length; i++) {
      pinFragment.appendChild(window.pins.renderPin(window.pins.advertisments[i]));
    }
    window.pins.pins.appendChild(pinFragment);
  };

  const getPageDisabled = function () {
    window.pins.map.classList.add(`map--faded`);
    window.form.form.classList.add(`ad-form--disabled`);
    window.form.form.reset();
    photoDrop.setAttribute(`disabled`, `disabled`);

    for (let i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute(`disabled`, `disabled`);
    }
    window.pins.mainPin.style.left = window.pins.MAIN_PIN_LEFT + `px`;
    window.pins.mainPin.style.top = window.pins.MAIN_PIN_TOP + `px`;
    addressInput.value = window.pins.MAIN_PIN_LEFT + ` , ` + window.pins.MAIN_PIN_TOP;
  };

  window.page = {
    getPageActive: getPageActive,
    getPageDisabled: getPageDisabled
  };
})();
