import Vue from "vue";
import Vuex from "vuex";

const EloRating = require("elo-rating");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    opponents: {
      1: {
        name: "Tiger",
        rating: 1000
      },
      2: {
        name: "Max",
        rating: 1000
      },
      3: {
        name: "Smokey",
        rating: 1000
      },
      4: {
        name: "Sam",
        rating: 1000
      },
      5: {
        name: "Kitty",
        rating: 1000
      },
      6: {
        name: "Sassy",
        rating: 1000
      },
      7: {
        name: "Shadow",
        rating: 1000
      },
      8: {
        name: "Simba",
        rating: 1000
      },
      9: {
        name: "Misty",
        rating: 1000
      },
      10: {
        name: "Lucky",
        rating: 1000
      }
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
