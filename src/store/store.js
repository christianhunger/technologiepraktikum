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
    updateRating(state, { firstId, secondId, winnerId }) {
      const opponent1 = state.opponents[firstId];
      const opponent2 = state.opponents[secondId];
      const didOpponent1Win = winnerId === firstId;
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
