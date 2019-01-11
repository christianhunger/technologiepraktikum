/**
 * @param state
 * @returns {string}
 */
export const opponentSrc = state => {
  return state.config.server.enabled ? "server" : "local";
};

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
export const imageUrlForOpponent = (state, getters) => opponentId => {
  return getters.currentOpponents[opponentId].imageUrl;
};

/**
 * @param state
 * @returns {*}
 */
export const currentOpponents = state => {
  if (state.config.server.enabled) {
    return state.opponents.server;
  } else {
    return state.opponents.local;
  }
};

/**
 * @param state
 * @param getters
 * @returns {{min: string, max: string}}
 */
export const currentOpponentIdRange = (state, getters) => {
  const currentOpponentIds = Object.keys(getters.currentOpponents).map(
    opponentId => parseInt(opponentId)
  );
  return {
    min: `${Math.min(...currentOpponentIds)}`,
    max: `${Math.max(...currentOpponentIds)}`
  };
};

/**
 * @param state
 * @param getters
 * @returns {any[]}
 */
export const allOpponentsSortedByTheirRating = (state, getters) => {
  // @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries.
  return Object.entries(getters.currentOpponents)
    .map(entry => {
      return {
        id: entry[0],
        ...entry[1]
      };
    })
    .sort((opponent1, opponent2) => opponent2.rating - opponent1.rating);
};
