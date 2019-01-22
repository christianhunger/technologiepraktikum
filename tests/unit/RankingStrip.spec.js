import { shallowMount } from "@vue/test-utils";
import RankingStrip from "@/components/RankingStrip";

describe("RankingStrip.vue", () => {
  const contendersSortedByRating = [
    { name: "Fluffykins", imageUrl: "fluffykins.png" },
    { name: "Furly", imageUrl: "furrrr.png" }
  ];

  it("renders a list of kittens when passed", () => {
    const wrapper = shallowMount(RankingStrip, {
      propsData: { contendersSortedByRating }
    });

    let html = wrapper.html();
    expect(html).toContain([contendersSortedByRating[0].imageUrl]);
    expect(html).toContain([contendersSortedByRating[1].imageUrl]);
    expect(wrapper.findAll("li")).toHaveLength(2);
  });

  it("sound match the snapshot", () => {
    const wrapper = shallowMount(RankingStrip, {
      propsData: { contendersSortedByRating }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
