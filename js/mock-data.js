import {features, types} from './static-data.js';
import {getRandomArrayElementOrNull, getRandomArrayElements} from './utils.js';

const avatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
];

const titles = [
  'Remarkable Value. Unbeatable Location',
  'Supreme Residences for a Modern Lifestyle',
  'Spacious Modern Living',
  'Love Where You Live'
];

const addresses = [
  '1600 Pennsylvania Avenue, Washington, D.C., USA',
  '4 Privet Drive, Little Whinging, Surrey',
  '221B Baker St., London',
  '350 Fifth Avenue, New York City, NY 10118'
];

const prices = [
  10000,
  35000,
  43000,
  17000
];

const roomsAndGuests = [
  {
    rooms: 2,
    guests: 2
  },
  {
    rooms: 1,
    guests: 2
  },
  {
    rooms: 1,
    guests: 1
  },
  {
    rooms: 100,
    guests: 0
  },
];

const checkInOuts = [
  {
    'in': '14:00',
    'out': '10:00'
  },
  {
    'in': '12:00',
    'out': '9:00'
  },
];

const descriptions = [
  'Don’t wait. Get Your Dream Apartment',
  'Scenery Everywhere',
  'An apartment that Brings More'
];

const photos = [
  'img/photos/1.jpeg',
  'img/photos/2.jpg'
];

function generateAdData() {
  const roomsAndGuestsOption = getRandomArrayElementOrNull(roomsAndGuests);
  const checkInOutOption = getRandomArrayElementOrNull(checkInOuts);

  return {
    avatar: getRandomArrayElementOrNull(avatars),
    title: getRandomArrayElementOrNull(titles),
    address: getRandomArrayElementOrNull(addresses),
    price: getRandomArrayElementOrNull(prices),
    type: getRandomArrayElementOrNull(types),
    rooms: roomsAndGuestsOption.rooms,
    guests: roomsAndGuestsOption.guests,
    checkin: checkInOutOption.in,
    checkout: checkInOutOption.out,
    features: getRandomArrayElements(features),
    description: getRandomArrayElementOrNull(descriptions, 50),
    photo: getRandomArrayElementOrNull(photos)
  };
}

function generateAdsData(numberOfAds) {
  const ads = [];
  for (let i = 0; i < numberOfAds; i++) {
    ads.push(generateAdData());
  }

  return ads;
}

function generateMockAds() {
  const adsData = generateAdsData(25);

  const adTemplate = document.querySelector('#card').content;

  const cards = [];

  for (const adData of adsData) {
    const clone = adTemplate.cloneNode(true);
    clone.querySelector('.popup__avatar').src = adData.avatar;
    clone.querySelector('.popup__title').textContent = adData.title;
    clone.querySelector('.popup__text--address').textContent = adData.address;
    clone.querySelector('.popup__text--price').innerHTML = `${adData.price} <span>₽/ночь</span>`;
    let typeLocalization;
    if (adData.type === 'flat') {
      typeLocalization = 'Квартира';
    } else if (adData.type === 'bungalow') {
      typeLocalization = 'Бунгало';
    } else if (adData.type === 'house') {
      typeLocalization = 'Дом';
    } else if (adData.type === 'palace') {
      typeLocalization = 'Дворец';
    } else if (adData.type === 'hotel') {
      typeLocalization = 'Отель';
    }

    clone.querySelector('.popup__type').textContent = typeLocalization;
    clone.querySelector('.popup__text--capacity').textContent = `${adData.rooms} комнаты для ${adData.guests} гостей`;
    clone.querySelector('.popup__text--time').textContent = `Заезд после ${adData.checkin}, выезд до ${adData.checkout}`;

    const featuresNodes = clone.querySelectorAll('.popup__feature');
    for (const featureNode of featuresNodes) {
      if (!adData.features.some((f) => featureNode.classList[1].includes(f))) {
        featureNode.remove();
      }
    }

    const descriptionNode = clone.querySelector('.popup__description');
    if (adData.description === null) {
      descriptionNode.remove();
    } else {
      descriptionNode.textContent = adData.description;
    }

    clone.querySelector('.popup__photo').src = adData.photo;

    cards.push(clone);
  }

  return cards;
}


export { generateMockAds };

