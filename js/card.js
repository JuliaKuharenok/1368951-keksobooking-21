'use strict';

(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
  const cardFragment = document.createDocumentFragment();


  const removeAdvertismentCard = function (advertismentCard) {
    advertismentCard.classList.add(`hidden`);
    if (document.querySelector(`.map__pin--active`)) {
      document.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
    }
  };

  const showFeatures = function (advertismentCard, advertisment) {
    const features = advertismentCard.querySelectorAll(`.popup__feature`);
    const realFeatures = advertisment.offer.features;
    features.forEach(function (feature) {
      feature.classList.add(`hidden`);
    });
    realFeatures.forEach(function (realFeature) {
      const feature = document.createElement(`li`);
      feature.className = `popup__feature popup__feature--` + realFeature;
      advertismentCard.querySelector(`.popup__features`).appendChild(feature);
    });
  };

  const showPhotos = function (advertismentCard, advertisment) {
    if (advertisment.offer.photos.length === 0) {
      advertismentCard.querySelector(`.popup__photo`).classList.add(`hidden`);
    } else {
      advertismentCard.querySelector(`.popup__photo`).src = advertisment.offer.photos[0];
      for (let i = 1; i < advertisment.offer.photos.length; i++) {
        const photo = document.createElement(`img`);
        photo.className = `popup__photo`;
        photo.src = advertisment.offer.photos[i];
        photo.width = `45`;
        photo.height = `40`;
        photo.alt = `Фотография жилья`;
        advertismentCard.querySelector(`.popup__photos`).appendChild(photo);
      }
    }
  };

  const renderCard = function (advertisment) {
    const advertismentCard = cardTemplate.cloneNode(true);
    advertismentCard.querySelector(`.popup__title`).textContent = advertisment.offer.title;
    advertismentCard.querySelector(`.popup__text--address`).textContent = advertisment.offer.address;
    advertismentCard.querySelector(`.popup__text--price`).textContent = advertisment.offer.price + `\u20BD` + `/ночь`;
    advertismentCard.querySelector(`.popup__type`).textContent = advertisment.offer.type;
    advertismentCard.querySelector(`.popup__text--capacity`).textContent = advertisment.offer.rooms + ` комнаты для ` + advertisment.offer.guests + ` гостей`;
    if ((advertisment.offer.rooms === 0) || (advertisment.offer.guests === 0)) {
      advertismentCard.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
    }
    advertismentCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + advertisment.offer.checkin + `, выезд до ` + advertisment.offer.checkout;

    showFeatures(advertismentCard, advertisment);

    advertismentCard.querySelector(`.popup__description`).textContent = advertisment.offer.description;

    showPhotos(advertismentCard, advertisment);

    advertismentCard.querySelector(`.popup__avatar`).src = advertisment.author.avatar;
    advertismentCard.querySelector(`.popup__close`).addEventListener(`click`, function () {
      removeAdvertismentCard(advertismentCard);
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        removeAdvertismentCard(advertismentCard);
      }
    }, {once: true});

    return advertismentCard;
  };

  const getAdvertismentCard = function (advertisment) {
    const previousCards = window.pins.map.querySelectorAll(`.map__card`);
    previousCards.forEach(function (previousCard) {
      removeAdvertismentCard(previousCard);
    });
    cardFragment.appendChild(renderCard(advertisment));
    window.pins.pins.appendChild(cardFragment);
  };

  window.card = {
    getAdvertismentCard: getAdvertismentCard,
    removeAdvertismentCard: removeAdvertismentCard
  };

})();
