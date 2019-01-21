import Vue from "vue";
import Vuex from "vuex";

import { kittens } from "./data/KittenTestdata.js";
import * as Mutations from "./mutations.js";
import * as Getters from "./getters.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contenders: {
      ...kittens
    }
  },
  mutations: {
    ...Mutations
  },
  getters: {
    ...Getters
  }
});
