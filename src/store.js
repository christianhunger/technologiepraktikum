import Vue from "vue";
import Vuex from "vuex";

const EloRating = require("elo-rating");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    kittens: {
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
      const kitten1 = state.kittens[firstId];
      const kitten2 = state.kittens[secondId];
      const didKitten1Win = winnerId === firstId;
      const { playerRating, opponentRating } = EloRating.calculate(
        kitten1.rating,
        kitten2.rating,
        didKitten1Win
      );
      kitten1.rating = playerRating;
      kitten2.rating = opponentRating;
    }
  },
  actions: {},
  getters: {
    allKittensSortedByTheirRating(state) {
      const kittens = Object.entries(state.kittens)
        .map(entry => {
          return {
            id: entry[0],
            ...entry[1]
          };
        })
        .sort((kitten1, kitten2) => kitten2.rating - kitten1.rating);
      return kittens;
    }
  }
});
