/**
 * Util to generate ids.
 * @module IdGeneratorUtil
 */

/**
 * Geenrates a random integer id in the range [min, max].
 * Throws an error if max <= min!
 *
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {number}
 */
export const randomIntInRange = (min, max) => {
  if (max <= min) {
    throw "Invalid arguments: max <= min.";
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min)) + min;
  return result;
};

/**
 * Generates two distinct integer ids in the range [min, max].
 * Throws an error if max <= min!
 *
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {{firstId: *, secondId: *}} - A tuple containing the ids.
 */
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
