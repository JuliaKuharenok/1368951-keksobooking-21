'use strict';

(function () {
  const TIME_FIRST_OPTION = `12:00`;
  const TIME_SECOND_OPTION = `13:00`;
  const TIME_THIRD_OPTION = `14:00`;
  const BUNGALOW_MIN_PRICE = `0`;
  const FLAT_MIN_PRICE = `1000`;
  const HOUSE_MIN_PRICE = `5000`;
  const PALACE_MIN_PRICE = `10000`;

  const advertismentForm = document.querySelector(`.ad-form`);
  const roomsInput = advertismentForm.querySelector(`#room_number`);
  const guestsInput = advertismentForm.querySelector(`#capacity`);
  const checkinTime = advertismentForm.querySelector(`#timein`);
  const checkoutTime = advertismentForm.querySelector(`#timeout`);
  const appartmentType = advertismentForm.querySelector(`#type`);
  const priceForNight = advertismentForm.querySelector(`#price`);
  const resetButton = advertismentForm.querySelector(`.ad-form__reset`);
  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const updateRoomValidity = function () {
    switch (roomsInput.value) {
      case `1`:
        if (guestsInput.value !== `1`) {
          guestsInput.setCustomValidity(`В одной комнате можно разместить не более одного гостя`);
          guestsInput.reportValidity();

          return;
        }
        break;
      case `2`:
        if ((guestsInput.value === `0`) || (guestsInput.value === `3`)) {
          guestsInput.setCustomValidity(`В двух комнатах можно разместить не более двух гостей`);
          guestsInput.reportValidity();

          return;
        }
        break;
      case `3`:
        if (guestsInput.value === `0`) {
          guestsInput.setCustomValidity(`В трех комнатах можно разместить до трех гостей`);
          guestsInput.reportValidity();

          return;
        }
        break;
      case `100`:
        if (guestsInput.value !== `0`) {
          guestsInput.setCustomValidity(`Сто комнат не предназначены для гостей`);
          guestsInput.reportValidity();

          return;
        }
        break;
    }
    guestsInput.setCustomValidity(``);
  };

  guestsInput.addEventListener(`change`, updateRoomValidity);
  roomsInput.addEventListener(`change`, updateRoomValidity);

  checkinTime.addEventListener(`change`, function () {
    switch (checkinTime.value) {
      case TIME_FIRST_OPTION:
        checkoutTime.value = TIME_FIRST_OPTION;
        break;
      case TIME_SECOND_OPTION:
        checkoutTime.value = TIME_SECOND_OPTION;
        break;
      case TIME_THIRD_OPTION:
        checkoutTime.value = TIME_THIRD_OPTION;
        break;
    }
  });

  appartmentType.addEventListener(`change`, function () {
    switch (appartmentType.value) {
      case `bungalow`:
        priceForNight.min = BUNGALOW_MIN_PRICE;
        priceForNight.placeholder = BUNGALOW_MIN_PRICE;
        break;
      case `flat`:
        priceForNight.min = FLAT_MIN_PRICE;
        priceForNight.placeholder = FLAT_MIN_PRICE;
        break;
      case `house`:
        priceForNight.min = HOUSE_MIN_PRICE;
        priceForNight.placeholder = HOUSE_MIN_PRICE;
        break;
      case `palace`:
        priceForNight.min = PALACE_MIN_PRICE;
        priceForNight.placeholder = PALACE_MIN_PRICE;
        break;
    }
  });

  const updatePriceValidity = function () {
    switch (appartmentType.value) {
      case `bungalow`:
        if (priceForNight.value < 0) {
          priceForNight.setCustomValidity(`Цена не может быть меньше 0`);
          priceForNight.reportValidity();

          return;
        }
        break;
      case `flat`:
        if (priceForNight.value < 1000) {
          priceForNight.setCustomValidity(`Цена должна быть больше или равна 1000`);
          priceForNight.reportValidity();

          return;
        }
        break;
      case `house`:
        if (priceForNight.value < 5000) {
          priceForNight.setCustomValidity(`Цена должна быть больше или равна 5000`);
          priceForNight.reportValidity();

          return;
        }
        break;
      case `palace`:
        if (priceForNight.value < 10000) {
          priceForNight.setCustomValidity(`Цена должна быть больше или равна 10000`);
          priceForNight.reportValidity();

          return;
        }
        break;
    }
    priceForNight.setCustomValidity(``);
  };

  priceForNight.addEventListener(`input`, updatePriceValidity);
  appartmentType.addEventListener(`change`, updatePriceValidity);

  resetButton.addEventListener(`click`, function () {
    window.page.getPageDisabled();
  });

  const removeMessage = function (messageType) {
    document.addEventListener(`click`, function () {
      window.pins.map.removeChild(messageType);
    }, {once: true});
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        window.pins.map.removeChild(messageType);
      }
    }, {once: true});
  };

  const successHendler = function () {
    window.page.getPageDisabled();
    const successMessage = successMessageTemplate.cloneNode(true);
    window.pins.map.appendChild(successMessage);
    removeMessage(successMessage);
  };

  const errorHendler = function () {
    const errorMessage = errorMessageTemplate.cloneNode(true);
    window.pins.map.appendChild(errorMessage);
    removeMessage(errorMessage);
  };

  advertismentForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.upload(new FormData(advertismentForm), successHendler, errorHendler);
  });

  window.form = {
    advertismentForm: advertismentForm,
    errorHendler: errorHendler,
    errorMessageTemplate: errorMessageTemplate,
    removeMessage: removeMessage
  };
})();
