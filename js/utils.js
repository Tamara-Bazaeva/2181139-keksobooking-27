function getRandomInt(minParam, maxParam) {
  const min = Math.min(minParam, maxParam);
  const max = Math.max(minParam, maxParam);

  return Math.round(Math.random() * (max - min) + min);
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

export { getRandomInt, getRandomArrayElementOrNull, getRandomArrayElements };

