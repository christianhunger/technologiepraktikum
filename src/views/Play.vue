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
      currentRound: {
        opponent1: {
          id: null,
          imageUrl: null
        },
        opponent2: {
          id: null,
          imageUrl: null
        }
      }
    };
  },
  computed: {
    ...mapGetters(["allOpponentsSortedByTheirRating", "imageUrlForOpponent"])
  },
  created() {
    // @see: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks.
    this.startNextRound();
  },
  methods: {
    handleRoundResult(winnerId) {
      const opponentId1 = this.currentRound.opponent1.id;
      const opponentId2 = this.currentRound.opponent2.id;

      this.$store.dispatch("updateRatingAction", {
        opponentId1,
        opponentId2,
        winnerId
      });
      this.startNextRound();
    },
    startNextRound() {
      const { firstId, secondId } = twoDifferentRandomIdsInRange(1, 10);
      this.currentRound = {
        opponent1: {
          id: firstId,
          imageUrl: this.imageUrlForOpponent(firstId)
        },
        opponent2: {
          id: secondId,
          imageUrl: this.imageUrlForOpponent(secondId)
        }
      };
    }
  }
};
</script>
