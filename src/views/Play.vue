<template>
  <div class="home">
    <h1 class="title">Kitten Compare</h1>
    <h2 class="subtitle">Which one do you like best?</h2>
    <Comparator :id1="currentRound.sample1.contenderId"
                :id2="currentRound.sample2.contenderId"
                :imageUrl1="currentRound.sample1.sampleUrl"
                :imageUrl2="currentRound.sample2.sampleUrl"
                v-on:winner="handleRoundResult"/>
    <h2 class="subtitle ranking-strip-title">The Current Rating:</h2>
    <RankingStrip :contendersSortedByRating="allContendersSortedByTheirRating"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Comparator from "@/components/Comparator";
import RankingStrip from "@/components/RankingStrip.vue";
import { twoDifferentRandomIdsInRange } from "@/util/IdGeneratorUtil";
import {
  sortContendersByTheirRating,
  currentContenderIdRange
} from "@/util/contenders";

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
    allContendersSortedByTheirRating() {
      return sortContendersByTheirRating(this.currentContenders);
    }
  },
  created() {
    // @see: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks.
    this.startNextRound();
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

      this.$emit("updateRating", roundResult);
      this.startNextRound();
    },
    startNextRound() {
      const { min, max } = currentContenderIdRange(this.currentContenders);
      const { firstId, secondId } = twoDifferentRandomIdsInRange(min, max);
      this.currentRound = this.roundModelForContenders(firstId, secondId);
    },
    roundModelForContenders(contenderId1, contenderId2) {
      return {
        sample1: {
          contenderId: contenderId1,
          sampleUrl: contenderId1
            ? this.currentContenders[contenderId1].imageUrl
            : ""
        },
        sample2: {
          contenderId: contenderId2,
          sampleUrl: contenderId2
            ? this.currentContenders[contenderId2].imageUrl
            : ""
        }
      };
    }
  },
  props: {
    currentContenders: Object
  }
};
</script>

<style scoped>
.ranking-strip-title {
  margin-bottom: 6px;
}
</style>
