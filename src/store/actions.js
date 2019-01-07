export const updateRatingAction = ({ commit, getters }, parameterObject) => {
  // Getters can't be accessed inside of mutations.
  // To switch dynamically between local & remote opponents, we have to wrap the commit
  // of the mutation in an action.
  parameterObject.opponentSrc = getters.opponentSrc;
  commit("updateRatingMutation", parameterObject);
};
