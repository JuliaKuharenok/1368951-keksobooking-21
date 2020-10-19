'use strict';

(function () {
  const form = document.querySelector(`.ad-form`);
  const roomsInput = form.querySelector(`#room_number`);
  const guestsInput = form.querySelector(`#capacity`);
  const checkinTime = form.querySelector(`#timein`);
  const checkoutTime = form.querySelector(`#timeout`);
  const appartmentType = form.querySelector(`#type`);
  const priceForNight = form.querySelector(`#price`);
  const resetButton = form.querySelector(`.ad-form__reset`);
  const submitButton = form.querySelector(`.ad-form__submit`);
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
      case `12:00`:
        checkoutTime.value = `12:00`;
        break;
      case `13:00`:
        checkoutTime.value = `13:00`;
        break;
      case `14:00`:
        checkoutTime.value = `14:00`;
        break;
    }
  });

  appartmentType.addEventListener(`change`, function () {
    switch (appartmentType.value) {
      case `bungalow`:
        priceForNight.min = `0`;
        priceForNight.placeholder = `0`;
        break;
      case `flat`:
        priceForNight.min = `1000`;
        priceForNight.placeholder = `1000`;
        break;
      case `house`:
        priceForNight.min = `5000`;
        priceForNight.placeholder = `5000`;
        break;
      case `palace`:
        priceForNight.min = `10000`;
        priceForNight.placeholder = `10000`;
        break;
    }
  });

  resetButton.addEventListener(`click`, function () {
    window.page.getPageDisabled();
  });

  const removeMessage = function (messageType) {
    document.addEventListener(`click`, function () {
      window.pins.map.removeChild(messageType);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        window.pins.map.removeChild(messageType);
      }
    });
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

  form.addEventListener(`submit`, function (evt) {
    window.upload(new FormData(form), successHendler(), errorHendler());
    evt.preventDefault();
  });

  window.form = {
    form: form
  };
})();
