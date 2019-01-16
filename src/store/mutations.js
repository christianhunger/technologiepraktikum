import EloRating from "elo-rating";

/**
 * @param state
 * @param contenderSrc
 * @param contenderId1
 * @param contenderId2
 * @param winnerId
 */
export const updateRatingMutation = (
  state,
  { contenderSrc, contenderId1, contenderId2, winnerId }
) => {
  const contender1 = state.contenders[contenderSrc][contenderId1];
  const contender2 = state.contenders[contenderSrc][contenderId2];
  const didContender1Win = winnerId === contenderId1;
  const { playerRating, contenderRating } = EloRating.calculate(
    contender1.rating,
    contender2.rating,
    didContender1Win
  );
  contender1.rating = playerRating;
  contender2.rating = contenderRating;
};

/**
 * @param state
 * @param contenders
 */
export const setServerContenders = (state, contenders) => {
  // The game server api returns a sorted list of contenders.
  // We have to map it to the format we use internally in the vuex store.
  // See: https://github.com/christianhunger/technologiepraktikum-gameserver
  const contenderObject = contenders.reduce((obj, contender) => {
    obj[contender.id] = contender;
    return obj;
  }, {});

  state.contenders.server = contenderObject;
};

/**
 * @param state
 * @param isEnabled
 */
export const setContenderPollingEnabled = (state, isEnabled) => {
  state.config.server.polling.enabled = isEnabled;
};
