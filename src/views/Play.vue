<template>
  <div class="home">
    <h1 class="title">Kitten Compare</h1>
    <h2 class="subtitle">Which one do you like best?</h2>
    <Comparator :id1="this.currentRound.sample1.contenderId"
                :id2="this.currentRound.sample2.contenderId"
                :imageUrl1="this.currentRound.sample1.sampleUrl"
                :imageUrl2="this.currentRound.sample2.sampleUrl"
                v-on:winner="handleRoundResult"/>
    <h2 class="subtitle ranking-strip-title">The Current Rating:</h2>
    <RankingStrip :contendersSortedByRating="allContendersSortedByTheirRating"/>
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
      currentRound: this.roundModelForContenders(null, null)
    };
  },
  computed: {
    ...mapGetters([
      "allContendersSortedByTheirRating",
      "imageUrlForContender",
      "currentContenderIdRange",
      "gameServerEnabled",
      "gameServerUrl"
    ])
  },
  created() {
    // @see: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks.
    if (this.gameServerEnabled) {
      this.$store.dispatch("startContenderPolling");
      // We wait for the list of contenders to change, because only then
      // we can be sure that new data arrived from the server and start the next round.
      const unwatch = this.$store.watch(
        (state, getters) => getters.allContendersSortedByTheirRating,
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
      const contenderId1 = this.currentRound.sample1.contenderId;
      const contenderId2 = this.currentRound.sample2.contenderId;

      const roundResult = {
        contenderId1,
        contenderId2,
        winnerId
      };

      if (this.gameServerEnabled) {
        this.$store.dispatch("publishRoundResult", roundResult);
      } else {
        this.$store.dispatch("updateRatingAction", roundResult);
      }
      this.startNextRound();
    },
    async startNextRound() {
      if (this.gameServerEnabled) {
        const serverResponse = await fetch(`${this.gameServerUrl}/round/new`);
        this.currentRound = await serverResponse.json();
      } else {
        const { min, max } = this.currentContenderIdRange;
        const { firstId, secondId } = twoDifferentRandomIdsInRange(min, max);
        this.currentRound = this.roundModelForContenders(firstId, secondId);
      }
    },
    roundModelForContenders(contenderId1, contenderId2) {
      return {
        sample1: {
          contenderId: contenderId1,
          sampleUrl: contenderId1 ? this.imageUrlForContender(contenderId1) : ""
        },
        sample2: {
          contenderId: contenderId2,
          sampleUrl: contenderId2 ? this.imageUrlForContender(contenderId2) : ""
        }
      };
    }
  }
};
</script>

<style scoped>
.ranking-strip-title {
  margin-bottom: 6px;
}
</style>
