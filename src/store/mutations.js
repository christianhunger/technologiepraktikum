import EloRating from "elo-rating";

/**
 * @param state
 * @param contenderId1
 * @param contenderId2
 * @param winnerId
 */
export const updateRating = (
  state,
  { contenderId1, contenderId2, winnerId }
) => {
  const contender1 = state.contenders[contenderId1];
  const contender2 = state.contenders[contenderId2];

  const didContender1Win = winnerId === contenderId1;
  const { playerRating, opponentRating } = EloRating.calculate(
    contender1.rating,
    contender2.rating,
    didContender1Win
  );

  contender1.rating = playerRating;
  contender2.rating = opponentRating;
};
