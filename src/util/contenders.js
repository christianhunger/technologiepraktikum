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
 * @returns {any[]}
 */
export const sortContendersByTheirRating = contenders => {
  // @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries.
  return Object.entries(contenders)
    .map(entry => {
      return {
        id: entry[0],
        ...entry[1]
      };
    })
    .sort((contender1, contender2) => contender2.rating - contender1.rating);
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
