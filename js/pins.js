'use strict';

(function () {
  const MAIN_PIN_TOP = 375;

  const map = document.querySelector(`.map`);
  const pins = map.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const xShiftMain = map.querySelector(`.map__pin--main`).offsetWidth / 2;
  const yShiftMain = map.querySelector(`.map__pin--main`).offsetHeight;
  const xShift = map.querySelector(`.map__pin`).offsetWidth / 2;
  const yShift = map.querySelector(`.map__pin`).offsetHeight;

  let mainPinLeft = 570;
  let pinsAmount = 5;

  if (document.documentElement.clientWidth < 1200) {
    mainPinLeft = Math.round((document.documentElement.clientWidth / 2) - xShiftMain);
  }

  const getPinsAmount = function (advertisment) {
    if (advertisment.length < 5) {
      pinsAmount = advertisment.length;
    }
    return pinsAmount;
  }

  const renderPin = function (advertisment) {
    const pin = pinTemplate.cloneNode(true);
    pin.style.left = advertisment.location.x - xShift + `px`;
    pin.style.top = advertisment.location.y - yShift + `px`;
    pin.querySelector(`img`).src = advertisment.author.avatar;
    pin.querySelector(`img`).alt = advertisment.offer.title;
    pin.addEventListener(`click`, function () {
      const previousCard = window.pins.map.querySelector(`.map__card`);
      if (previousCard) {
        window.card.removeAdvertismentCard(previousCard);
      }
      window.card.getAdvertismentCard(advertisment);
      pin.classList.add(`map__pin--active`);
    });
    pin.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        pin.classList.add(`map__pin--active`);
        window.card.getAdvertismentCard(advertisment);
      }
    });

    return pin;
  };

  const removePins = function () {
    const pinsCollection = window.pins.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinsCollection.forEach(function (pinsCollectionElement) {
      pins.removeChild(pinsCollectionElement);
    });
  };

  const showPins = function (advertisments) {
    const pinFragment = document.createDocumentFragment();
    for (let i = 0; i < getPinsAmount(advertisments); i++) {
      pinFragment.appendChild(window.pins.renderPin(advertisments[i]));
    }
    pins.appendChild(pinFragment);
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt[`which`] === 1) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY

      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;

        if (startCoords.x < 120) {
          mainPin.style.left = 0 - xShiftMain + `px`;
        }

        if (startCoords.x > 1140) {
          mainPin.style.left = 1200 - xShiftMain + `px`;
        }

        if (startCoords.y < 130) {
          mainPin.style.top = 130 - yShiftMain + `px`;
        }

        if (startCoords.y > 630) {
          mainPin.style.top = 630 - yShiftMain + `px`;
        }

      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.page.updateAddress();
        
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      window.page.getPageActive(); 
           
      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });

  window.pins = {
    map: map,
    pins: pins,
    mainPin: mainPin,
    mainPinLeft: mainPinLeft,
    MAIN_PIN_TOP: MAIN_PIN_TOP,
    xShiftMain: xShiftMain,
    yShiftMain: yShiftMain,
    xShift: xShift,
    yShift: yShift,
    renderPin: renderPin,
    showPins: showPins,
    removePins: removePins
  };
})();
