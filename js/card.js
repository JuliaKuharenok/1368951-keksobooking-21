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

  const renderCard = function (advertisment) {
    const advertismentCard = cardTemplate.cloneNode(true);
    advertismentCard.querySelector(`.popup__title`).textContent = advertisment.offer.title;
    advertismentCard.querySelector(`.popup__text--address`).textContent = advertisment.offer.address;
    advertismentCard.querySelector(`.popup__text--price`).textContent = advertisment.offer.price;
    advertismentCard.querySelector(`.popup__type`).textContent = advertisment.offer.type;
    advertismentCard.querySelector(`.popup__text--capacity`).textContent = advertisment.offer.rooms + ` комнаты для ` + advertisment.offer.guests + ` гостей`;
    advertismentCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + advertisment.offer.checkin + `, выезд до ` + advertisment.offer.checkout;

    const features = advertismentCard.querySelectorAll(`.popup__feature`);
    console.log(features);
    const realFeatures = advertisment.offer.features;
    console.log(realFeatures);
     for (let i = 0; i < features.length; i++) {
      for (let j = 0; j < realFeatures.length; j++) {
        if (!features[i].classList.contains(`popup__feature--` + realFeatures[j])) {
          //features[i].classList.add(`hidden`);
        }
      }
    }

    if (!features[2].classList.contains(`popup__feature--` + realFeatures[2])) {
      console.log(features[2]);
    }

    advertismentCard.querySelector(`.popup__description`).textContent = advertisment.offer.description;
    advertismentCard.querySelector(`.popup__photo`).src = advertisment.offer.photos[0];
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
    for (let i = 0; i < previousCards.length; i++) {
      removeAdvertismentCard(previousCards[i]);
    }
    cardFragment.appendChild(renderCard(advertisment));
    window.pins.pins.appendChild(cardFragment);
  };

  window.card = {
    getAdvertismentCard: getAdvertismentCard,
    removeAdvertismentCard: removeAdvertismentCard
  };

})();
