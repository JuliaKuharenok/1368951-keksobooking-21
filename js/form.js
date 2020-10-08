'use strict';

(function () {
  const roomsInput = document.querySelector(`#room_number`);
  const guestsInput = document.querySelector(`#capacity`);
  const checkinTime = document.querySelector(`#timein`);
  const checkoutTime = document.querySelector(`#timeout`);
  const appartmentType = document.querySelector(`#type`);
  const priceForNight = document.querySelector(`#price`);

  guestsInput.addEventListener(`change`, function () {
    switch (roomsInput.value) {
      case `1`:
        if (guestsInput.value !== `1`) {
          guestsInput.setCustomValidity(`В одной комнате можно разместить не более одного гостя`);
        }
        break;
      case `2`:
        if ((guestsInput.value === `0`) || (guestsInput.value === `3`)) {
          guestsInput.setCustomValidity(`В двух комнатах можно разместить не более двух гостей`);
        }
        break;
      case `3`:
        if (guestsInput.value === `0`) {
          guestsInput.setCustomValidity(`В трех комнатах можно разместить до трех гостей`);
        }
        break;
      case `100`:
        if (guestsInput.value !== `0`) {
          guestsInput.setCustomValidity(`Сто комнат не предназначены для гостей`);
        }
        break;
    }
  });

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
})();
