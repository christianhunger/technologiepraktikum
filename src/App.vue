<template>
  <div id="app">
    <img src="logo.png" width="64"/>
    <Comparator :id1="currentRound.sample1.contenderId"
                :id2="currentRound.sample2.contenderId"
                :imageUrl1="currentRound.sample1.sampleUrl"
                :imageUrl2="currentRound.sample2.sampleUrl"
                @winner="handleWinner"/>
    <!-- <pre>{{ currentContenders }}</pre> -->
  </div>
</template>

<script>
import { kittens } from "@/util/KittenTestdata.js";
import Comparator from "@/components/Comparator";
import { currentContenderIdRange, updateRating } from "@/util/contenders";
import { twoDifferentRandomIdsInRange } from "./util/IdGeneratorUtil";

export default {
  name: "App",
  components: {
    Comparator
  },
  data() {
    return {
      currentContenders: kittens,
      contenderId1: null,
      contenderId2: null
    };
  },
  mounted() {
    // @See https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
    this.startNextRound();
  },
  computed: {
    currentRound() {
      return {
        sample1: {
          contenderId: this.contenderId1,
          sampleUrl: this.contenderId1
            ? this.currentContenders[this.contenderId1].imageUrl
            : ""
        },
        sample2: {
          contenderId: this.contenderId2,
          sampleUrl: this.contenderId2
            ? this.currentContenders[this.contenderId2].imageUrl
            : ""
        }
      };
    }
  },
  methods: {
    handleWinner(winnerId) {
      const result = {
        contenderId1: this.contenderId1,
        contenderId2: this.contenderId2,
        winnerId
      };

      this.currentContenders = updateRating(this.currentContenders, result);

      this.startNextRound();
    },
    startNextRound() {
      const { min, max } = currentContenderIdRange(this.currentContenders);
      const { firstId, secondId } = twoDifferentRandomIdsInRange(min, max);
      this.contenderId1 = firstId;
      this.contenderId2 = secondId;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
