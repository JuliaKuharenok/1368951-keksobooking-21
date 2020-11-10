'use strict';

(function () {
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;

  let advertisments = [];
  let housingType;
  let price;
  let rooms;
  let guests;
  let neededFeatures = [];

  const housingTypeFilter = document.querySelector(`#housing-type`);
  const priceFilter = document.querySelector(`#housing-price`);
  const roomsFilter = document.querySelector(`#housing-rooms`);
  const guestsFilter = document.querySelector(`#housing-guests`);
  const checkbox = document.querySelectorAll(`.map__checkbox`);

  const getRank = function (advertisment) {
    let rank = 0;

    if (advertisment.offer.type === housingType) {
      rank += 5;
    }

    switch (price) {
      case `low`:
        if (advertisment.offer.price < LOW_PRICE) {
          rank += 4;
        }
        break;
      case `high`:
        if (advertisment.offer.price > HIGH_PRICE) {
          rank += 4;
        }
        break;
      case `middle`:
        if ((advertisment.offer.price >= LOW_PRICE) && (advertisment.offer.price <= HIGH_PRICE)) {
          rank += 4;
        }
        break;
    }

    if (advertisment.offer.rooms === rooms) {
      rank += 3;
    }

    if (advertisment.offer.guests === guests) {
      rank += 2;
    }

    advertisment.offer.features.forEach(function (featuresElement) {
      neededFeatures.forEach(function (neededFeature) {
        if (featuresElement === neededFeature) {
          rank += 1;
        }
      });
    });

    return rank;
  };

  const updatePins = function () {
    if (document.querySelector(`.map__card`)) {
      window.card.removeAdvertismentCard(document.querySelector(`.map__card`));
    }
    window.pins.removePins();
    advertisments = advertisments.sort(function (left, right) {

      return getRank(right) - getRank(left);
    });
    console.log(advertisments);
    let filtredAdvertisments = [];
    for (let i = 1; i < advertisments.length; i++) {
      if (getRank(advertisments[0]) === getRank(advertisments[i])) {
        filtredAdvertisments.push(advertisments[i]);
      }
    }
    filtredAdvertisments.push(advertisments[0]);
    console.log(filtredAdvertisments);
    window.pins.showPins(filtredAdvertisments);
    /*window.pins.showPins(advertisments.sort(function (left, right) {

      return getRank(right) - getRank(left);
    }));*/
  };

  housingTypeFilter.addEventListener(`change`, function () {
    housingType = housingTypeFilter.value;
    updatePins();
  });

  roomsFilter.addEventListener(`change`, function () {
    rooms = Number(roomsFilter.value);
    updatePins();
  });

  guestsFilter.addEventListener(`change`, function () {
    guests = Number(guestsFilter.value);
    updatePins();
  });

  priceFilter.addEventListener(`change`, function () {
    price = priceFilter.value;
    updatePins();
  });

  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener(`change`, function () {
      if (checkbox[i].checked) {
        neededFeatures.push(checkbox[i].value);
      }
      updatePins();
    });
  }

  const successHandler = function (data) {
    advertisments = data;
    updatePins();
  };

  const errorHendler = function () {
    const errorMessage = window.form.errorMessageTemplate.cloneNode(true);
    errorMessage.querySelector(`.error__message`).textContent = `Ошибка соеденинения`;
    window.pins.map.appendChild(errorMessage);
    window.form.removeMessage(errorMessage);
  };

  window.filters = {
    checkbox: checkbox,
    errorHendler: errorHendler,
    successHandler: successHandler
  };

})();
