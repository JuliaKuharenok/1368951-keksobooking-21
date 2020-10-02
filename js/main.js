'use strict';

// Примеры массивов с данными
const APARTMENT_TYPE = [`Квартира`, `Дом`, `Дворец`, `Бунгало`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const APARTMENT_FEATURES = [`.popup__feature--wifi`, `.popup__feature--dishwasher`, `.popup__feature--parking`, `.popup__feature--washer`, `.popup__feature--elevator`, `.popup__feature--conditioner`];

// Функция получения рандомного числа в заданном диапазоне
const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция получения рандомного элемента из массива
const random = function (array) {
  const randomItem = array[Math.floor(Math.random() * array.length)];
  return randomItem;
};

// Функция получения нескольких рандомных элементов из массива
const randomElements = function (array, neededElements) {
  const result = [];
  for (let i = 0; i < neededElements; i++) {
    result.push(array[Math.floor(Math.random() * array.length)]);
  }
  return result;
};

// Функция создания массива с несколькими объектами
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
        features: random(APARTMENT_FEATURES),
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

// Метки
const map = document.querySelector(`.map`);
const pins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// Сдвиг относительно координат адреса
const xShift = map.querySelector(`.map__pin`).offsetWidth / 2;
const yShift = map.querySelector(`.map__pin`).offsetHeight;

const advertisments = createArray(8);

// Функция создания шаблона метки и наполнение его данными из массива
const renderPin = function (advertisment) {
  const pin = pinTemplate.cloneNode(true);
  pin.style.left = String(advertisment.location.x + xShift) + `px`;
  pin.style.top = String(advertisment.location.y + yShift) + `px`;
  pin.querySelector(`img`).src = advertisment.author.avatar;
  pin.querySelector(`img`).alt = advertisment.offer.title;
  return pin;
};

// Получение n-ого количества меток по шаблону
const pinFragment = document.createDocumentFragment();
for (let i = 0; i < advertisments.length; i++) {
  pinFragment.appendChild(renderPin(advertisments[i]));
}

// Карточка объявления
/* const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

// Функция создания шаблона карточки и наполнение его данными из массива
const renderCard = function (advertisment) {
  const advertismentCard = cardTemplate.cloneNode(true);
  advertismentCard.querySelector(`.popup__title`).textContent = advertisment.offer.title;
  advertismentCard.querySelector(`.popup__text--address`).textContent = advertisment.offer.address;
  advertismentCard.querySelector(`.popup__text--price`).textContent = advertisment.offer.price;
  advertismentCard.querySelector(`.popup__type`).textContent = advertisment.offer.type;
  advertismentCard.querySelector(`.popup__text--capacity`).textContent = advertisment.offer.rooms + ` комнаты для ` + advertisment.offer.guests + ` гостей`;
  advertismentCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + advertisment.offer.checkin + `, выезд до ` + advertisment.offer.checkout;
  advertismentCard.querySelector(`.popup__features`).removeChild(advertismentCard.querySelector(advertisment.offer.features));
  advertismentCard.querySelector(`.popup__description`).textContent = advertisment.offer.description;
  advertismentCard.querySelector(`.popup__photo`).src = advertisment.offer.photos;
  advertismentCard.querySelector(`.popup__avatar`).src = advertisment.author.avatar;
  return advertismentCard;
};

// Получение разных по содержанию карточек по шаблону
const cardFragment = document.createDocumentFragment();
for (let i = 0; i < advertisments.length; i++) {
  cardFragment.appendChild(renderCard(advertisments[i]));
}
map.appendChild(cardFragment); */

// Временное решение для показа карты
// map.classList.remove(`map--faded`);

// Неактивное состояние страницы
// Disabled на кнопку загрузки аватара
const photoDrop = document.querySelector(`.ad-form-header`);
photoDrop.setAttribute(`disabled`, `disabled`);

// Disabled на поля формы
const formFieldsets = document.querySelectorAll(`.ad-form__element`);
for (let i = 0; i < formFieldsets.length; i++) {
  formFieldsets[i].setAttribute(`disabled`, `disabled`);
}

// Активное состояние страницы
const getPageActive = function () {
  // Отключаем заблокированное состояние у карты
  map.classList.remove(`map--faded`);
  // Отключаем заблокированное состояние у кнопки закрузки фото
  photoDrop.removeAttribute(`disabled`, `disabled`);
  // Отключаем заблокированное состояние у полей формы
  for (let i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute(`disabled`, `disabled`);
  }
  // Отрисовываем метки
  pins.appendChild(pinFragment);
};

const mainPin = map.querySelector(`.map__pin--main`);
mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt[`which`] === 1) {
    getPageActive();
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    getPageActive();
  }
});
