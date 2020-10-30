'use strict';

(function () {
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
            if (advertisment.offer.price < 10000) {
              rank += 4;
            }
            break;
          case `high`:
            if (advertisment.offer.price > 50000) {
              rank += 4;
            }
            break;
          case `middle`:
            if ((advertisment.offer.price >= 10000) && (advertisment.offer.price <= 50000)) {
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
        for (let i = 0; i < advertisment.offer.features.length; i++) {
          for (let j = 0; j < neededFeatures.length; j++) {
            if (advertisment.offer.features[i] === neededFeatures[j]) {
              rank +=1;
            }
          }
        }
        return rank;
      }
    
      const updatePins = function () {
        window.pins.removePins();
        window.pins.showPins(advertisments.sort(function (left, right) {
          return getRank(right) - getRank(left);
        }));
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
          console.log(neededFeatures);
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
      console.log(errorMessage.querySelector(`.error__message`).textContent);
      errorMessage.querySelector(`.error__message`).textContent = `Ошибка соеденинения`;
      console.log(errorMessage.querySelector(`.error__message`).textContent);
      window.pins.map.appendChild(errorMessage);
      window.form.removeMessage(errorMessage);
    };

window.filters = {
  checkbox: checkbox,
  errorHendler: errorHendler,
  successHandler: successHandler
};

}) ();