'use strict';

const map = document.querySelector(`.map`);

const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const APARTMENT_TYPE = [`Квартира`, `Дом`, `Дворец`, `Бунгало`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const APARTMENT_FEATURES = document.querySelectorAll(`.popup__feature`); /* возвращает пустой */

const random = function (array) {
  const randomItem = array[Math.floor(Math.random() * array.length)];
  return randomItem;
};

/* const randomElements = function (array, neededElements) {
  const result = [];
  for (let i = 0; i < neededElements; i++) {
    result.push(array[Math.floor(Math.random() * array.length)]);
  }
  return result;
};*/

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
        price: getRandomIntInclusive(100, 100000) + ` ₽/ночь`,
        type: random(APARTMENT_TYPE),
        rooms: getRandomIntInclusive(1, 10),
        guests: getRandomIntInclusive(1, 10),
        checkin: random(TIMES),
        checkout: random(TIMES),
        features: APARTMENT_FEATURES,
        description: `Описание`,
        photos: random(PHOTOS)
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
  pin.style.left = String(advertisment.location.x + xShift) + `px`;
  pin.style.top = String(advertisment.location.y + yShift) + `px`;
  pin.querySelector(`img`).src = advertisment.author.avatar;
  pin.querySelector(`img`).alt = advertisment.offer.title;
  return pin;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < advertisments.length; i++) {
  fragment.appendChild(renderPin(advertisments[i]));
}
pins.appendChild(fragment);

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

for (let i = 0; i < advertisments.length; i++) {
  const advertismentCard = cardTemplate.cloneNode(true);
  advertismentCard.querySelector(`.popup__title`).textContent = advertisments[i].offer.title;
  advertismentCard.querySelector(`.popup__text--address`).textContent = advertisments[i].offer.address;
  advertismentCard.querySelector(`.popup__text--price`).textContent = advertisments[i].offer.price;
  advertismentCard.querySelector(`.popup__type`).textContent = advertisments[i].offer.type;
  advertismentCard.querySelector(`.popup__text--capacity`).textContent = advertisments[i].offer.rooms + ` комнаты для ` + advertisments[i].offer.guests + ` гостей`;
  advertismentCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + advertisments[i].offer.checkin + `, выезд до ` + advertisments[i].offer.checkout;
  // advertismentCard.querySelector(`.popup__features`).content = advertisments[i].offer.features; /* не придумала как вывести именно рандомные каринки */
  advertismentCard.querySelector(`.popup__description`).textContent = advertisments[i].offer.description;
  advertismentCard.querySelector(`.popup__photo`).src = advertisments[i].offer.photos;
  advertismentCard.querySelector(`.popup__avatar`).src = advertisments[i].author.avatar;
  map.appendChild(advertismentCard);
}

map.classList.remove(`map--faded`);
