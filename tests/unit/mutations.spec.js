import EloRating from "elo-rating";
import { updateRating } from "@/store/mutations";
import { kittens } from "@/store/data/KittenTestdata";

const state = {
  config: {
    server: {
      enabled: false,
      polling: {
        enabled: false,
        interval: 5000,
        intervalId: null
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
};

describe("mutations.js", () => {
  it("uses the elo rating dependency", () => {
    EloRating.calculate = jest.fn(() => ({
      playerRating: 1337,
      opponentRating: 42
    }));

    updateRating(state, {
      contenderId1: 1,
      contenderId2: 2,
      winnerId: 1
    });

    expect(EloRating.calculate).toHaveBeenCalledTimes(1);
    expect(state.contenders.local[1].rating).toBe(1337);
    expect(state.contenders.local[2].rating).toBe(42);
  });
});
