'use strict';

const map = document.querySelector(`.map`);

const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createArray = function (elementsNumber) {
  const array = [];
  for (let i = 0; i < elementsNumber; i++) {
    const arrayElement = {
      author: {
        avatar: `img/avatars/user0` + (i + 1) + `.png`
      },
      offer: {
        title: `Заголовок`,
        address: `{{location.x}}, {{location.y}}`,
        price: `Стоимость`,
        type: `palace, flat, house или bungalow`,
        rooms: `Количество комнат`,
        guests: `Количество гостей, которое можно разместить`,
        checkin: `12:00, 13:00 или 14:00`,
        checkout: `12:00, 13:00 или 14:00`,
        features: `"wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"`,
        description: `Описание`,
        photos: `"http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"`
      },
      location: {
        x: getRandomIntInclusive(0, 1024),
        y: getRandomIntInclusive(130, 630)
      }
    };
    array.push(arrayElement);
  }
  return array;
};

const advertisments = createArray(8);

const pins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPin = function (advertisment) {
  const pin = pinTemplate.cloneNode(true);
  // pin.querySelector(`.map__pin`).style = `left: location.x, right: location.y`;
  pin.querySelector(`.map__pin`).src = advertisment.avatar;
  pin.querySelector(`.map__pin`).alt = advertisment.title;
  return pin;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < advertisments.length; i++) {
  fragment.appendChild(renderPin(advertisments[i]));
}
pins.appendChild(fragment);

map.classList.remove(`map--faded`);
