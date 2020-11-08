'use strict';

(function () {
  const photoDrop = window.form.advertismentForm.querySelector(`.ad-form-header`);
  const formFieldsets = window.form.advertismentForm.querySelectorAll(`.ad-form__element`);
  const addressInput = window.form.advertismentForm.querySelector(`#address`);
  const filtersForm = document.querySelector(`.map__filters`);
  const filters = filtersForm.querySelectorAll(`.map__filter`);


  const getPageActive = function () {
    window.pins.map.classList.remove(`map--faded`);
    window.form.advertismentForm.classList.remove(`ad-form--disabled`);
    photoDrop.removeAttribute(`disabled`);

    formFieldsets.forEach(function (formFieldset) {
      formFieldset.removeAttribute(`disabled`);
    });

    filters.forEach(function (filter) {
      filter.removeAttribute(`disabled`);
    });

    window.filters.checkbox.forEach(function (checkboxElement) {
      checkboxElement.removeAttribute(`disabled`);
    });

    addressInput.value = (Math.round(window.pins.mainPin.offsetLeft + window.pins.xShiftMain)) + ` , ` + (window.pins.mainPin.offsetTop + window.pins.yShiftMain);

    window.load(window.filters.successHandler, window.filters.errorHendler);
  };

  const getPageDisabled = function () {
    window.pins.map.classList.add(`map--faded`);
    window.form.advertismentForm.classList.add(`ad-form--disabled`);
    window.form.advertismentForm.reset();
    filtersForm.reset();
    photoDrop.setAttribute(`disabled`, `disabled`);

    formFieldsets.forEach(function (formFieldset) {
      formFieldset.setAttribute(`disabled`, `disabled`);
    });

    filters.forEach(function (filter) {
      filter.setAttribute(`disabled`, `disabled`);
    });

    window.filters.checkbox.forEach(function (checkboxElement) {
      checkboxElement.setAttribute(`disabled`, `disabled`);
    });

    window.pins.mainPin.style.left = window.pins.mainPinLeft + `px`;
    window.pins.mainPin.style.top = window.pins.MAIN_PIN_TOP + `px`;
    addressInput.value = window.pins.mainPinLeft + ` , ` + window.pins.MAIN_PIN_TOP;

    window.pins.removePins();

    if (window.pins.map.querySelector(`.map__card`)) {
      window.card.removeAdvertismentCard(window.pins.map.querySelector(`.map__card`));
    }
  };

  getPageDisabled();

  window.page = {
    getPageActive: getPageActive,
    getPageDisabled: getPageDisabled
  };
})();
