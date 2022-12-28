import { toggleForm } from './form.js';

const address = document.querySelector('#address');

const latLngToString = function (latLng, roundToDec = 5) {
  return `${Math.round(latLng.lat * Math.pow(10, roundToDec)) / Math.pow(10, roundToDec)}, ${Math.round(latLng.lng * Math.pow(10, roundToDec)) / Math.pow(10, roundToDec)}`;
};

let map;

const initMap = function () {
  map = L.map('map-canvas', { tap: false })
    .on('load', () => {
      toggleForm(true);
    })
    .setView({
      lat: 36,
      lng: 139.4,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 36,
      lng: 139.4,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  address.value = latLngToString(mainPinMarker.getLatLng());

  mainPinMarker.on('moveend', (evt) => {
    address.value = latLngToString(evt.target.getLatLng());
  });
  mainPinMarker.addTo(map);
};

const populateMap = function (ads) {
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  for (const ad of ads){
    const pinMarker = L.marker(
      {
        lat: ad.data.address.lat,
        lng: ad.data.address.lng,
      },
      {

        icon: pinIcon,
      },
    );
    pinMarker.addTo(map)
      .bindPopup(ad.card);
  }

};

export {initMap, populateMap};

