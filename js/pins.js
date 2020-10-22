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

  if (document.documentElement.clientWidth < 1200) {
    mainPinLeft = Math.round((document.documentElement.clientWidth / 2) - xShiftMain);
  } 

  const renderPin = function (advertisment) {
    const pin = pinTemplate.cloneNode(true);
    pin.style.left = advertisment.location.x + xShift + `px`;
    pin.style.top = advertisment.location.y + yShift + `px`;
    pin.querySelector(`img`).src = advertisment.author.avatar;
    pin.querySelector(`img`).alt = advertisment.offer.title;
    pin.addEventListener(`click`, function () {
      window.card.getAdvertismentCard(advertisment);
    });
    pin.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.card.getAdvertismentCard(advertisment);
      }
    });
    return pin;
  };

  const showPins = function (advertisments) {
    const pinFragment = document.createDocumentFragment();
    for (let i = 0; i < advertisments.length - 1; i++) {
      pinFragment.appendChild(window.pins.renderPin(advertisments[i]));
    }
    window.pins.pins.appendChild(pinFragment);
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
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        window.page.getPageActive();
      };

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
    showPins: showPins
  };
})();
