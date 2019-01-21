import EloRating from "elo-rating";

/**
 * @param contenders
 * @param contenderId1
 * @param contenderId2
 * @param winnerId
 */
export const updateRating = (
  { ...contenders },
  { contenderId1, contenderId2, winnerId }
) => {
  const contender1 = contenders[contenderId1];
  const contender2 = contenders[contenderId2];

  const didContender1Win = winnerId === contenderId1;
  const { playerRating, opponentRating } = EloRating.calculate(
    contender1.rating,
    contender2.rating,
    didContender1Win
  );

  contender1.rating = playerRating;
  contender2.rating = opponentRating;
  return contenders;
};

/**
 * @param contenders
 * @returns {{min: number, max: number}}
 */
export const currentContenderIdRange = contenders => {
  const currentContenderIds = Object.keys(contenders).map(contenderId =>
    parseInt(contenderId)
  );

  return {
    min: Math.min(...currentContenderIds),
    max: Math.max(...currentContenderIds)
  };
};
