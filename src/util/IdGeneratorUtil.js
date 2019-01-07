const randomIntInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min)) + min;
  return result;
};

export const twoDifferentRandomIdsInRange = (min, max) => {
  if (max <= min) {
    throw "Invalid arguments: max <= min.";
  }

  const firstId = randomIntInRange(min, max);
  let secondId = randomIntInRange(min, max);

  while (firstId === secondId) {
    secondId = randomIntInRange(min, max);
  }

  return { firstId, secondId };
};
