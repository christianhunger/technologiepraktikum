const EloRating = require("elo-rating");

/**
 * @param state
 * @param opponentId1
 * @param opponentId2
 * @param winnerId
 */
export const updateRatingMutation = (
  state,
  { opponentSrc, opponentId1, opponentId2, winnerId }
) => {
  const opponent1 = state.opponents[opponentSrc][opponentId1];
  const opponent2 = state.opponents[opponentSrc][opponentId2];
  const didOpponent1Win = winnerId === opponentId1;
  const { playerRating, opponentRating } = EloRating.calculate(
    opponent1.rating,
    opponent2.rating,
    didOpponent1Win
  );
  opponent1.rating = playerRating;
  opponent2.rating = opponentRating;
};

/**
 * @param state
 * @param opponents
 */
export const setServerOpponents = (state, contenders) => {
  // The game server api returns a sorted list of contenders.
  // We have to map it to the format we use internally in the vuex store.
  // See: https://github.com/christianhunger/technologiepraktikum-gameserver
  const contenderObject = contenders.reduce((obj, contender) => {
    obj[contender.id] = contender;
    return obj;
  }, {});

  state.opponents.server = contenderObject;
};

/**
 * @param state
 * @param isEnabled
 */
export const setOpponentPollingEnabled = (state, isEnabled) => {
  state.config.server.polling.enabled = isEnabled;
};
