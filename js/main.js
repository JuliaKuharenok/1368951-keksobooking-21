'use strict';

// Примеры массивов с данными
const APARTMENT_TYPE = [`Квартира`, `Дом`, `Дворец`, `Бунгало`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const APARTMENT_FEATURES = [`.popup__feature--wifi`, `.popup__feature--dishwasher`, `.popup__feature--parking`,
  `.popup__feature--washer`, `.popup__feature--elevator`, `.popup__feature--conditioner`];

// Начальные координаты главной метски
const MAIN_PIN_LEFT = 570;
const MAIN_PIN_TOP = 375;

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
/* const randomElements = function (array, neededElements) {
  const result = [];
  for (let i = 0; i < neededElements; i++) {
    result.push(array[Math.floor(Math.random() * array.length)]);
  }
  return result;
};*/

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

// Метки с обявлениями
const map = document.querySelector(`.map`);
const pins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// Карточка объявления
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
const cardFragment = document.createDocumentFragment();

// Сдвиг относительно координат адреса у главной метки
const xShiftMain = map.querySelector(`.map__pin--main`).offsetWidth / 2;
const yShiftMain = map.querySelector(`.map__pin--main`).offsetHeight;

// Сдвиг относительно координат адреса у маленьких меток
const xShift = map.querySelector(`.map__pin`).offsetWidth / 2;
const yShift = map.querySelector(`.map__pin`).offsetHeight;

// Массив с данными объявлений
const advertisments = createArray(8);

// Функция показа объявления
const getAdvertismentCard = function (advertisment) {
  cardFragment.appendChild(renderCard(advertisment));
  pins.appendChild(cardFragment);
};

// Функция закрытия объявления
const removeAdvertismentCard = function (advertismentCard) {
  advertismentCard.classList.add(`hidden`);
};

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
  // Добавление обработчика событий на карточку для ее закрытия
  advertismentCard.querySelector(`.popup__close`).addEventListener(`click`, function () {
    removeAdvertismentCard(advertismentCard);
  });
  advertismentCard.querySelector(`.popup__close`).addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      removeAdvertismentCard(advertismentCard);
    }
  });
  return advertismentCard;
};

// Функция создания шаблона метки и наполнение его данными из массива
const renderPin = function (advertisment) {
  const pin = pinTemplate.cloneNode(true);
  pin.style.left = advertisment.location.x + xShift + `px`;
  pin.style.top = advertisment.location.y + yShift + `px`;
  pin.querySelector(`img`).src = advertisment.author.avatar;
  pin.querySelector(`img`).alt = advertisment.offer.title;
  // Добавление обработчика событий на метку для показа карточки объявления
  pin.addEventListener(`click`, function () {
    getAdvertismentCard(advertisment);
  });
  pin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      getAdvertismentCard(advertisment);
    }
  });
  return pin;
};

// Неактивное состояние страницы
// Disabled на кнопку загрузки аватара
const photoDrop = document.querySelector(`.ad-form-header`);
photoDrop.setAttribute(`disabled`, `disabled`);

// Disabled на поля формы
const formFieldsets = document.querySelectorAll(`.ad-form__element`);
for (let i = 0; i < formFieldsets.length; i++) {
  formFieldsets[i].setAttribute(`disabled`, `disabled`);
}

// Заполенное поле адреса
const addressInput = document.querySelector(`#address`);
addressInput.value = MAIN_PIN_LEFT + ` , ` + MAIN_PIN_TOP;

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
  // Изменяем значение инпута с адресом
  addressInput.value = (Math.round(MAIN_PIN_LEFT + xShiftMain)) + ` , ` + (MAIN_PIN_TOP + yShiftMain);
  // Отрисовываем метки
  const pinFragment = document.createDocumentFragment();
  for (let i = 0; i < advertisments.length; i++) {
    pinFragment.appendChild(renderPin(advertisments[i]));
  }
  pins.appendChild(pinFragment);
};

// Переключение страницы в активное состояние
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

// Валидация формы: количество комнат и гостей
const roomsInput = document.querySelector(`#room_number`);
const guestsInput = document.querySelector(`#capacity`);

// Проверка соотвествия количества комнат и количества гостей
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

// Валидация формы: время заезда и выезда
const checkinTime = document.querySelector(`#timein`);
const checkoutTime = document.querySelector(`#timeout`);

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

// Валидация формы: тип жилья и цена за ночь
const appartmentType = document.querySelector(`#type`);
const priceForNight = document.querySelector(`#price`);

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
