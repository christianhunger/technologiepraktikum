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
        enabled: true,
        polling: {
          enabled: true,
          interval: 5000,
          intervalId: null
        },
        host: "node.cloud.dmwe.de",
        port: "80"
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
