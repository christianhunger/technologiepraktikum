<template>
  <div class="home">
    <h1 class="title">Kitten Compare</h1>
    <h2 class="subtitle">Which one do you like best?</h2>
    <Comparator :id1="this.currentRound.opponent1.id"
                :id2="this.currentRound.opponent2.id"
                :imageUrl1="this.currentRound.opponent1.imageUrl"
                :imageUrl2="this.currentRound.opponent2.imageUrl"
                v-on:winner="handleRoundResult"/>
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
      // Model for the current game round.
      currentRound: this.roundModelForOpponents(null, null)
    };
  },
  computed: {
    ...mapGetters([
      "allOpponentsSortedByTheirRating",
      "imageUrlForOpponent",
      "currentOpponentIdRange",
      "gameServerEnabled"
    ])
  },
  created() {
    // @see: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks.
    if (this.gameServerEnabled) {
      this.$store.dispatch("startOpponentPolling");
      // We wait for the list of contenders to change, because only then
      // we can be sure that new data arrived from the server and start the next round.
      const unwatch = this.$store.watch(
        (state, getters) => getters.allOpponentsSortedByTheirRating,
        () => {
          this.startNextRound();
          unwatch();
        }
      );
    } else {
      this.startNextRound();
    }
  },
  methods: {
    handleRoundResult(winnerId) {
      const opponentId1 = this.currentRound.opponent1.id;
      const opponentId2 = this.currentRound.opponent2.id;

      const roundResult = {
        opponentId1,
        opponentId2,
        winnerId
      };

      if (this.gameServerEnabled) {
        this.$store.dispatch("publishRoundResult", roundResult);
      } else {
        this.$store.dispatch("updateRatingAction", roundResult);
      }
      this.startNextRound();
    },
    startNextRound() {
      const { min, max } = this.currentOpponentIdRange;
      const { firstId, secondId } = twoDifferentRandomIdsInRange(min, max);
      this.currentRound = this.roundModelForOpponents(firstId, secondId);
    },
    roundModelForOpponents(opponentId1, opponentId2) {
      return {
        opponent1: {
          id: opponentId1,
          imageUrl: opponentId1 ? this.imageUrlForOpponent(opponentId1) : ""
        },
        opponent2: {
          id: opponentId2,
          imageUrl: opponentId2 ? this.imageUrlForOpponent(opponentId2) : ""
        }
      };
    }
  }
};
</script>
