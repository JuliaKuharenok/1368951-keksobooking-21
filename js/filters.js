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
        const pinsCollection = window.pins.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
        for (let i = 0; i < pinsCollection.length; i++) {
          window.pins.pins.removeChild(pinsCollection[i]);
        }
        console.log(advertisments.sort(function (left, right) {
          return getRank(right) - getRank(left);
        }));
        window.pins.showPins(advertisments.sort(function (left, right) {
          return getRank(right) - getRank(left);
        }));
      };


   /*const updatePins = function () {

        const similarAdvertisments = advertisments.filter(function (advertisment) {
            return  advertisment.offer.type === housingType && advertisment.offer.rooms === rooms;
            /*advertisment.offer.rooms === rooms && advertisment.offer.guests === guests
        });
        console.log(similarAdvertisments);

        const pinsCollection = window.pins.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
        for (let i = 0; i < pinsCollection.length; i++) {
          window.pins.pins.removeChild(pinsCollection[i]);
        }

        let filtredAdvertisments = similarAdvertisments;
    
        window.pins.showPins(filtredAdvertisments); 
        console.log(filtredAdvertisments);
    }; */

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
        //updatePins();
    };

    const errorHendler = function () {
        console.log(`error`);
    };

    window.load(successHandler, errorHendler);

            /*switch (price) {
          case `middle`: 
            if ((advertisment.offer.type > 10000) && (advertisment.offer.type < 50000)) {
              rank +=4;
            }
            break;
          case `low`:
            if (advertisment.offer.type < 10000) {
              rank +=4;
            }
            break;
          case `high`:
            if (advertisment.offer.type > 50000) {
              rank +=4;
            }
            break;    
        }*/

}) ();