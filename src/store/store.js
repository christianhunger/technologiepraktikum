import Vue from "vue";
import Vuex from "vuex";

import { kittens } from "./data/KittenTestdata.js";

const EloRating = require("elo-rating");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    opponents: {
      ...kittens
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
    updateRating(state, { opponentId1, opponentId2, winnerId }) {
      const opponent1 = state.opponents[opponentId1];
      const opponent2 = state.opponents[opponentId2];
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
  actions: {},
  getters: {
    allOpponentsSortedByTheirRating(state) {
      // @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries.
      return Object.entries(state.opponents)
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
