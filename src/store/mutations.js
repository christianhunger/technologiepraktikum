const EloRating = require("elo-rating");

/**
 *
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
