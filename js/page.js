'use strict';

(function () {
  const photoDrop = window.form.form.querySelector(`.ad-form-header`);
  const formFieldsets = window.form.form.querySelectorAll(`.ad-form__element`);
  const addressInput = window.form.form.querySelector(`#address`);
  const filtersForm = document.querySelector(`.map__filters`);
  const filters = filtersForm.querySelectorAll(`.map__filter`);


  const getPageActive = function () {
    window.pins.map.classList.remove(`map--faded`);
    window.form.form.classList.remove(`ad-form--disabled`);
    photoDrop.removeAttribute(`disabled`);

    for (let i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute(`disabled`);
    }

    for (let i = 0; i < filters.length; i++) {
      filters[i].removeAttribute(`disabled`);
    }

    for (let i = 0; i < window.filters.checkbox.length; i++) {
      window.filters.checkbox[i].removeAttribute(`disabled`);
    }

    addressInput.value = (Math.round(window.pins.mainPin.offsetLeft + window.pins.xShiftMain)) + ` , ` + (window.pins.mainPin.offsetTop + window.pins.yShiftMain);

    window.load(window.pins.showPins, window.form.errorHendler);
  };

  const getPageDisabled = function () {
    window.pins.map.classList.add(`map--faded`);
    window.form.form.classList.add(`ad-form--disabled`);
    window.form.form.reset();
    filtersForm.reset();
    photoDrop.setAttribute(`disabled`, `disabled`);

    for (let i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute(`disabled`, `disabled`);
    }

    for (let i = 0; i < filters.length; i++) {
      filters[i].setAttribute(`disabled`, `disabled`);
    }

    for (let i = 0; i < window.filters.checkbox.length; i++) {
      window.filters.checkbox[i].setAttribute(`disabled`, `disabled`);
    }

    window.pins.mainPin.style.left = window.pins.mainPinLeft + `px`;
    window.pins.mainPin.style.top = window.pins.MAIN_PIN_TOP + `px`;
    addressInput.value = window.pins.mainPinLeft + ` , ` + window.pins.MAIN_PIN_TOP;

    window.pins.removePins();

    if (window.pins.map.querySelector('.map__card')) {
      window.card.removeAdvertismentCard(window.pins.map.querySelector(`.map__card`));
    } 
  };

  getPageDisabled();

  window.page = {
    getPageActive: getPageActive,
    getPageDisabled: getPageDisabled
  };
})();
