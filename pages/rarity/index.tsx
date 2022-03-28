import React, { useEffect, useState, useMemo } from "react";
import { useApi } from "../../components/use-api";
import { totalRarity } from "../../constants/traits";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const Divider = ({ caption }: { caption: string }) => {
  return (
    <div className="title border-b-4 border-black w-full mb-2">{caption}</div>
  );
};

const Dog = (props: any) => {
  const { dog, position } = props;
  return (
    <>
      {position === 10 && <Divider caption="Top 10" />}
      {position === 30 && <Divider caption="Top 30" />}
      {position === 50 && <Divider caption="Top 50" />}
      {position === 100 && <Divider caption="Top 100" />}
      <div className="w-20 mb-2 m-1">
        <img alt={dog.name} className="w-full" key={dog.name} src={dog.image} />
        <div className="title text-center">#{dog.edition}</div>
        <div className="text-center text-sm text-gray-500">
          1 in {formatter.format(Math.floor(dog.rarityOneIn))}
        </div>
      </div>
    </>
  );
};

const RarityPage = () => {
  const { dogs } = useApi();

  const dogsByRarity = dogs
    .map((dog) => {
      const rarity = totalRarity(dog.attributes);
      return {
        ...dog,
        rarity,
        rarityOneIn: 1 / rarity,
      };
    })
    .sort((a: any, b: any) => (a.rarity < b.rarity ? -1 : 1));

  return (
    <>
      <div className="w-full">
        <div className="flex w-full flex-wrap justify-center max-w-md ml-auto mr-auto">
          {dogsByRarity.map((dog, position) => (
            <Dog key={dog.name} dog={dog} position={position} />
          ))}
        </div>

        <pre className="overflow-hidden break-words whitespace-pre-wrap w-full">
          {JSON.stringify(dogsByRarity.map((d) => Math.floor(d.rarityOneIn)))}
        </pre>
      </div>
    </>
  );
};

export default RarityPage;
