/**
 * @param state
 * @returns {function(*): (string|*)}
 */
export const imageUrlForContender = state => contenderId => {
  return state.contenders[contenderId].imageUrl;
};

/**
 * @param state
 * @returns {{min: number, max: number}}
 */
export const currentContenderIdRange = state => {
  const currentContenderIds = Object.keys(state.contenders).map(contenderId =>
    parseInt(contenderId)
  );

  return {
    min: Math.min(...currentContenderIds),
    max: Math.max(...currentContenderIds)
  };
};

/**
 * @param state
 * @returns {any[]}
 */
export const allContendersSortedByTheirRating = state => {
  // @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries.
  return Object.entries(state.contenders)
    .map(entry => {
      return {
        id: entry[0],
        ...entry[1]
      };
    })
    .sort((contender1, contender2) => contender2.rating - contender1.rating);
};
