<template>
  <div class="home">
    <h1 class="title">Kitten Compare</h1>
    <h2 class="subtitle">Which one do you like best?</h2>
    <Comparator :opponentId1="this.opponents.opponentId1" :opponentId2="this.opponents.opponentId2" v-on:winner="handleRoundResult"/>
    <h2 class="subtitle" style="margin-bottom: 6px">The Current Rating:</h2>
    <RankingStrip :opponentsSortedByRating="allOpponentsSortedByTheirRating"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
import Comparator from "@/components/Comparator.vue";
import RankingStrip from "@/components/RankingStrip.vue";
import { twoDifferentRandomIdsInRange } from "@/util/IdGeneratorUtil.js";

export default {
  name: "home",
  components: {
    Comparator,
    RankingStrip
  },
  data() {
    return {
      opponents: {
        opponentId1: null,
        opponentId2: null
      }
    };
  },
  computed: {
    ...mapGetters(["allOpponentsSortedByTheirRating"])
  },
  created() {
    // @see: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks.
    this.startNextRound();
  },
  methods: {
    handleRoundResult(winnerId) {
      const opponentId1 = this.opponents.opponentId1;
      const opponentId2 = this.opponents.opponentId2;

      this.$store.dispatch("updateRatingAction", {
        opponentId1,
        opponentId2,
        winnerId
      });
      this.startNextRound();
    },
    startNextRound() {
      const { firstId, secondId } = twoDifferentRandomIdsInRange(1, 10);
      this.opponents = {
        opponentId1: firstId,
        opponentId2: secondId
      };
    }
  }
};
</script>
