import { totalRarity } from "../traits";

describe("Traits calc", () => {
  test("it works", () => {
    const dog = {
      attributes: [
        { trait_type: "Background", value: "None" },
        { trait_type: "Body", value: "RedBrown" },
        { trait_type: "Neck", value: "None" },
        { trait_type: "Mouth", value: "None" },
        { trait_type: "Ears", value: "GoldEarring" },
        { trait_type: "Head", value: "PartyHat" },
        { trait_type: "Eyes", value: "3DGlasses" },
      ],
      description: "Degen Dogs are NFTs that stream DeFi tokens to owners.",
      edition: 0,
      name: "Degen Dog #0",
      external_url: "https://degendogs.club/#dog0",
      image: "https://api.degendogs.club/images/0.png",
    };

    const total = totalRarity(dog.attributes);

    expect(total).toBe(0.000010603260834681289);

    const dog2 = {
      attributes: [
        { trait_type: "Background", value: "None" },
        { trait_type: "Body", value: "Ukraine" },
        { trait_type: "Neck", value: "None" },
        { trait_type: "Mouth", value: "None" },
        { trait_type: "Ears", value: "None" },
        { trait_type: "Head", value: "None" },
        { trait_type: "Eyes", value: "None" },
      ],
      description: "Degen Dogs are NFTs that stream DeFi tokens to owners.",
      edition: 1,
      name: "Degen Dog #1: Ukraine Dog",
      external_url: "https://degendogs.club/#dog1",
      image: "https://api.degendogs.club/images/1.png",
    };

    const total2 = totalRarity(dog2.attributes);

    expect(total2).toBe(0.0000023854826783605827);
  });
});
