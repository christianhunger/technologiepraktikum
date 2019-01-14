/**
 * @param commit
 * @param getters
 * @param parameterObject
 */
export const updateRatingAction = ({ commit, getters }, parameterObject) => {
  // Getters can't be accessed inside of mutations.
  // To switch dynamically between local & remote contenders, we have to wrap the commit
  // of the mutation in an action.
  parameterObject.contenderSrc = getters.contenderSrc;
  commit("updateRatingMutation", parameterObject);
};

/**
 * @param commit
 * @param getters
 * @param winnerId
 * @param contenderId1
 * @param contenderId2
 * @returns {Promise<void>}
 */
export const publishRoundResult = async (
  { commit, getters },
  { winnerId, contenderId1, contenderId2 }
) => {
  const loserId = winnerId === contenderId1 ? contenderId2 : contenderId1;

  const requestConfig = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      winnerId,
      loserId
    })
  };

  const serverResponse = await fetch(
    `${getters.gameServerUrl}/round/result`,
    requestConfig
  );
  const contenders = await serverResponse.json();
  commit("setServerContenders", contenders);
};

/**
 * @param state
 * @param commit
 * @param dispatch
 */
export const startContenderPolling = ({ state, commit, dispatch }) => {
  const pollingInterval = state.config.server.polling.interval || 1000;
  commit("setContenderPollingEnabled", true);
  dispatch("pollServerForContenders");
  setInterval(() => dispatch("pollServerForContenders"), pollingInterval);
  // TODO: clean-up.
};

/**
 * @param commit
 */
export const stopContenderPolling = ({ commit }) => {
  commit("setContenderPollingEnabled", false);
};

/**
 * @param state
 * @param dispatch
 */
export const pollServerForContenders = ({ state, dispatch }) => {
  const pollingEnabled = state.config.server.polling.enabled;

  if (pollingEnabled) {
    dispatch("loadContendersFromServer");
  }
};

/**
 * @param commit
 * @param getters
 * @returns {Promise<void>}
 */
export const loadContendersFromServer = async ({ commit, getters }) => {
  const serverResponse = await fetch(`${getters.gameServerUrl}/contenders`);
  const contenders = await serverResponse.json();
  commit("setServerContenders", contenders);
};
