import React, { useEffect, useState, useMemo } from "react";
import { useApi } from "../../components/use-api";
import {
  totalRarity,
  traits,
  TraitTypes,
  runningRarities,
} from "../../constants/traits";
import cn from "classnames";

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const Divider = ({ caption }: { caption: string }) => {
  return (
    <div className="title border-b-4 border-black w-full mb-2">{caption}</div>
  );
};

const Dog = (props: any) => {
  const { dog, position, onClick } = props;
  return (
    <>
      {position === 10 && <Divider caption="Top 10" />}
      {position === 30 && <Divider caption="Top 30" />}
      {position === 50 && <Divider caption="Top 50" />}
      {position === 100 && <Divider caption="Top 100" />}
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          onClick(dog);
        }}
        className="w-20 mb-2 m-1"
      >
        <img alt={dog.name} className="w-full" key={dog.name} src={dog.image} />
        <div className="title text-center">#{dog.edition}</div>
        <div className="text-center text-sm text-gray-500">
          1 in {formatter.format(Math.floor(dog.rarityOneIn))}
        </div>
      </button>
    </>
  );
};

const DogDetail = (props: any) => {
  const { dog } = props;
  if (!dog)
    return (
      <div className="flex flex-col items-center">
        <img
          className="w-1/2 md:w-full opacity-100"
          src="/dog336.png"
          alt="No dog selected"
        />
        <div className="title my-3 text-center">No dog selected</div>
      </div>
    );
  // key here forces the component to rerender to show animation
  return (
    <div className="flex flex-col items-center">
      <img className="w-1/2 md:w-full" src={dog.image} alt={dog.name} />
      <div className="title my-3 text-center">{dog.name}</div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mb-1"
        href={`https://degendogs.club/#dog${dog.edition}`}
      >
        degendogs.club/#dog{dog.edition}
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mb-2"
        href={`https://opensea.io/assets/matic/0xa920464b46548930befecca5467860b2b4c2b5b9/${dog.edition}`}
      >
        Opensea Dog #{dog.edition}
      </a>
      <div className="flex flex-wrap">
        {dog?.attributes.map((attribute: any, i: number) => (
          <>
            <div key={attribute["trait_type"]} className="p-1 w-1/3">
              <div className="bg-gray-200 rounded-md p-2">
                <div className="text-sm text-blue-500 text-center truncate">
                  {attribute["trait_type"]}
                </div>
                <div className="text-center text-sm truncate">
                  {attribute["value"]}
                </div>
                <div className="text-xs text-center">
                  {(dog.traitRarities[i] * 100).toFixed(0)}% so far
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

const RarityPage = () => {
  const [currentDog, setCurrentDog] = useState<{}>();
  const { dogs } = useApi();
  const realRarities = useMemo(() => runningRarities(dogs), [dogs]);

  const dogsByRarity = dogs
    .map((dog) => {
      const rarity = totalRarity(dog.attributes);
      const traitRarities = dog.attributes.map(
        ({ trait_type, value }: { trait_type: string; value: string }) =>
          realRarities[`${trait_type}#${value}`] / dogs.length
      );
      return {
        ...dog,
        rarity,
        rarityOneIn: 1 / rarity,
        traitRarities,
      };
    })
    .sort((a: any, b: any) => (a.rarity < b.rarity ? -1 : 1));

  const mainColumnClassName = cn(
    "transition-all max-w-md mx-auto col-start-1 col-span-3 md:col-span-2 order-last md:order-first"
  );

  const detailClassName = cn(
    "col-start-1 col-span-3 md:col-start-3 md:col-span-1"
  );

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-3">
        <div className={mainColumnClassName}>
          <div className="flex justify-center flex-wrap">
            {dogsByRarity.map((dog, position) => (
              <Dog
                onClick={setCurrentDog}
                key={dog.name}
                dog={dog}
                position={position}
              />
            ))}
          </div>
        </div>
        <div className={detailClassName}>
          <div className="w-full">
            <DogDetail dog={currentDog} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RarityPage;
