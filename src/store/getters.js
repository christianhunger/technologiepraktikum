export const opponentSrc = state => {
  return state.config.useLocalOpponents ? "local" : "remote";
};

export const imageUrlForOpponent = (state, getters) => opponentId => {
  return getters.currentOpponents[opponentId].imageUrl;
};

export const currentOpponents = state => {
  if (state.config.useLocalOpponents) {
    return state.opponents.local;
  } else {
    return state.opponents.remote;
  }
};

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
