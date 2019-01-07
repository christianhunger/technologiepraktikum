import Vue from "vue";
import Vuex from "vuex";

import { kittens } from "./data/KittenTestdata.js";
import * as Actions from "./actions.js";
import * as Mutations from "./mutations.js";
import * as Getters from "./getters.js";

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
    ...Mutations
  },
  actions: {
    ...Actions
  },
  getters: {
    ...Getters
  }
});
