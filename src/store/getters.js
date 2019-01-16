export const gameServerEnabled = state => state.config.server.enabled;

/**
 * @param state
 * @returns {string}
 */
export const gameServerUrl = state =>
  `http://${state.config.server.host}:${state.config.server.port}`;

/**
 * @param state
 * @param getters
 * @returns {function(*): (string|*)}
 */
export const imageUrlForContender = (state, getters) => contenderId => {
  return getters.currentContenders[contenderId].imageUrl;
};

/**
 * @param state
 * @returns {*}
 */
export const currentContenders = state => {
  if (state.config.server.enabled) {
    return state.contenders.server;
  } else {
    return state.contenders.local;
  }
};

/**
 * @param state
 * @param getters
 * @returns {{min: number, max: number}}
 */
export const currentContenderIdRange = (state, getters) => {
  const currentContenderIds = Object.keys(getters.currentContenders).map(
    contenderId => parseInt(contenderId)
  );
  return {
    min: Math.min(...currentContenderIds),
    max: Math.max(...currentContenderIds)
  };
};

/**
 * @param state
 * @param getters
 * @returns {any[]}
 */
export const allContendersSortedByTheirRating = (state, getters) => {
  // @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries.
  return Object.entries(getters.currentContenders)
    .map(entry => {
      return {
        id: entry[0],
        ...entry[1]
      };
    })
    .sort((contender1, contender2) => contender2.rating - contender1.rating);
};
