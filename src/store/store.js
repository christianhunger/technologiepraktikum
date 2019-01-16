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
      server: {
        enabled: false,
        polling: {
          enabled: true,
          interval: 5000
        },
        host: "127.0.0.1",
        port: "3000"
      }
    },
    contenders: {
      local: {
        ...kittens
      },
      server: {}
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
