function getRandom(minParam, maxParam) {
  const min = Math.min(minParam, maxParam);
  const max = Math.max(minParam, maxParam);

  return Math.random() * (max - min) + min;
}

function getRandomInt(minParam, maxParam) {
  return Math.round(getRandom(minParam, maxParam));
}

function getRandomArrayElementOrNull(a, nullProbability = 0) {
  if (nullProbability > 0 && getRandomInt(0, 100) < nullProbability) {
    return null;
  }

  return a[getRandomInt(0, a.length - 1)];
}

function getRandomArrayElements(a) {
  const amount = getRandomInt(0, a.length - 1);
  const result = [];
  const notSelectedElements = [...a];

  for (let i = 0; i < amount; i++) {
    const randomElement = getRandomArrayElementOrNull(notSelectedElements);
    result.push(randomElement);
    const randomElementIndex = notSelectedElements.indexOf(randomElement);
    notSelectedElements.splice(randomElementIndex, 1);
  }

  return result;
}

function getRandomGeoLocation(top, right, bottom, left) {
  const lat = getRandom(top, bottom);
  const lng = getRandom(left, right);
  return {
    lat,
    lng
  };
}

export {getRandomInt, getRandomArrayElementOrNull, getRandomArrayElements, getRandomGeoLocation};

