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
export const startContenderPolling = ({ getters, commit, dispatch }) => {
  const pollingInterval = getters.pollingConfig.interval || 1000;
  // Immediately load contenders from server, then start interval.
  dispatch("pollServerForContenders");

  const intervalId = setInterval(
    () => dispatch("pollServerForContenders"),
    pollingInterval
  );
  commit("configureContenderPolling", { enabled: true, intervalId });
};

/**
 * @param commit
 */
export const stopContenderPolling = ({ getters, commit }) => {
  const intervalId = getters.pollingConfig.intervalId;

  if (intervalId != null) {
    clearInterval(intervalId);
  }
  commit("configureContenderPolling", { enabled: false, intervalId: null });
};

/**
 * @param state
 * @param dispatch
 */
export const pollServerForContenders = ({ getters, dispatch }) => {
  const pollingEnabled = getters.pollingConfig.enabled;

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
