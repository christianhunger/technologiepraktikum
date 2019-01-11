/**
 * @param commit
 * @param getters
 * @param parameterObject
 */
export const updateRatingAction = ({ commit, getters }, parameterObject) => {
  // Getters can't be accessed inside of mutations.
  // To switch dynamically between local & remote opponents, we have to wrap the commit
  // of the mutation in an action.
  parameterObject.opponentSrc = getters.opponentSrc;
  commit("updateRatingMutation", parameterObject);
};

/**
 * @param commit
 * @param getters
 * @param winnerId
 * @param opponentId1
 * @param opponentId2
 * @returns {Promise<void>}
 */
export const publishRoundResult = async (
  { commit, getters },
  { winnerId, opponentId1, opponentId2 }
) => {
  const loserId = winnerId === opponentId1 ? opponentId2 : opponentId1;

  const requestConfig = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      winnerId,
      loserId
    })
  };

  const serverResponse = await fetch(
    `${getters.gameServerUrl}/update-rating`,
    requestConfig
  );
  const opponents = await serverResponse.json();
  commit("setServerOpponents", opponents);
};

/**
 * @param state
 * @param commit
 * @param dispatch
 */
export const startOpponentPolling = ({ state, commit, dispatch }) => {
  const pollingInterval = state.config.server.polling.interval || 1000;
  commit("setOpponentPollingEnabled", true);
  dispatch("pollServerForOpponents");
  setInterval(() => dispatch("pollServerForOpponents"), pollingInterval);
  // TODO: clean-up.
};

/**
 * @param commit
 */
export const stopOpponentPolling = ({ commit }) => {
  commit("setOpponentPollingEnabled", false);
};

/**
 * @param state
 * @param dispatch
 */
export const pollServerForOpponents = ({ state, dispatch }) => {
  const pollingEnabled = state.config.server.polling.enabled;

  if (pollingEnabled) {
    dispatch("loadOpponentsFromServer");
  }
};

/**
 * @param commit
 * @param getters
 * @returns {Promise<void>}
 */
export const loadOpponentsFromServer = async ({ commit, getters }) => {
  const serverResponse = await fetch(`${getters.gameServerUrl}/opponents`);
  const opponents = await serverResponse.json();
  commit("setServerOpponents", opponents);
};
