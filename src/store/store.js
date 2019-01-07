import Vue from "vue";
import Vuex from "vuex";

import { kittens } from "./data/KittenTestdata.js";

const EloRating = require("elo-rating");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      useLocalOpponents: true
    },
    opponents: {
      local: {
        ...kittens
      },
      remote: {}
    }
  },
  mutations: {
    /**
     *
     * @param state
     * @param opponentId1
     * @param opponentId2
     * @param winnerId
     */
    updateRatingMutation(
      state,
      { opponentSrc, opponentId1, opponentId2, winnerId }
    ) {
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
    }
  },
  actions: {
    updateRatingAction({ commit, getters }, parameterObject) {
      // Getters can't be accessed inside of mutations.
      // To switch dynamically between local & remote opponents, we have to wrap the commit
      // of the mutation in an action.
      parameterObject.opponentSrc = getters.opponentSrc;
      commit("updateRatingMutation", parameterObject);
    }
  },
  getters: {
    opponentSrc(state) {
      return state.config.useLocalOpponents ? "local" : "remote";
    },
    currentOpponents(state) {
      if (state.config.useLocalOpponents) {
        return state.opponents.local;
      } else {
        return state.opponents.remote;
      }
    },
    allOpponentsSortedByTheirRating(state, getters) {
      // @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries.
      return Object.entries(getters.currentOpponents)
        .map(entry => {
          return {
            id: entry[0],
            ...entry[1]
          };
        })
        .sort((opponent1, opponent2) => opponent2.rating - opponent1.rating);
    }
  }
});
