'use strict';

(function () {
  const APARTMENT_TYPE = [`Квартира`, `Дом`, `Дворец`, `Бунгало`];
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const APARTMENT_FEATURES = [`.popup__feature--wifi`, `.popup__feature--dishwasher`, `.popup__feature--parking`,
    `.popup__feature--washer`, `.popup__feature--elevator`, `.popup__feature--conditioner`];
  const MAIN_PIN_LEFT = 570;
  const MAIN_PIN_TOP = 375;

  const map = document.querySelector(`.map`);
  const pins = map.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const xShiftMain = map.querySelector(`.map__pin--main`).offsetWidth / 2;
  const yShiftMain = map.querySelector(`.map__pin--main`).offsetHeight;
  const xShift = map.querySelector(`.map__pin`).offsetWidth / 2;
  const yShift = map.querySelector(`.map__pin`).offsetHeight;

  const createArray = function (elementsNumber) {
    const array = [];
    for (let i = 0; i < elementsNumber; i++) {
      const arrayElement = {
        author: {
          avatar: `img/avatars/user0` + (i + 1) + `.png`
        },
        offer: {
          title: `Заголовок`,
          address: `Адрес`,
          price: window.util.getRandomIntInclusive(100, 100000) + ` ₽/ночь`,
          type: window.util.random(APARTMENT_TYPE),
          rooms: window.util.getRandomIntInclusive(1, 10),
          guests: window.util.getRandomIntInclusive(1, 10),
          checkin: window.util.random(TIMES),
          checkout: window.util.random(TIMES),
          features: window.util.random(APARTMENT_FEATURES),
          description: `Описание`,
          photos: window.util.random(PHOTOS)
        },
        location: {
          x: window.util.getRandomIntInclusive(0, 1024),
          y: window.util.getRandomIntInclusive(130, 630)
        }
      };
      array.push(arrayElement);
    }
    return array;
  };
  const advertisments = createArray(8);

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
    MAIN_PIN_LEFT: MAIN_PIN_LEFT,
    MAIN_PIN_TOP: MAIN_PIN_TOP,
    xShiftMain: xShiftMain,
    yShiftMain: yShiftMain,
    xShift: xShift,
    yShift: yShift,
    advertisments: advertisments,
    renderPin: renderPin
  };
})();
