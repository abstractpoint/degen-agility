import React, { useEffect, useState } from "react";
import { Observable } from "rxjs";

const RarityPage = () => {
  const localStore = () => {
    const allDogs = JSON.parse(window.localStorage.getItem("dogs") || "[]");
    const lastId = allDogs.length > 0 ? allDogs.length - 1 : -1;
    return { allDogs, lastId };
  };
  const setLocalStore = (dogs: any[]) => {
    window.localStorage.setItem("dogs", JSON.stringify(dogs));
  };

  const [dogs, setDogs] = useState<any[]>([]);
  const fetcher = (id: number) =>
    fetch(`https://api.degendogs.club/meta/${id}`).then((res) => res.json());

  useEffect(() => {
    const { allDogs } = localStore();
    setDogs(allDogs);

    const source$ = new Observable((observer) => {
      const fetchNext = (id: number) => {
        fetcher(id).then((res) => {
          if (res.name) {
            observer.next(res);
            fetchNext(id + 1);
          }
        });
      };
      const { lastId } = localStore();
      fetchNext(lastId + 1);
    });

    const sub = source$.subscribe((dog) => {
      setDogs((dogs) => {
        setLocalStore([...dogs, dog]);
        return [...dogs, dog];
      });
    });

    return () => sub.unsubscribe();
  }, []);

  return (
    <>
      <button onClick={() => console.log("load")}>Load</button>
      <div suppressHydrationWarning className="w-full">
        <div suppressHydrationWarning className="flex w-full flex-wrap">
          {dogs.map((dog) => (
            <img className="w-20" key={dog.name} src={dog.image} />
          ))}
        </div>
        <pre className="overflow-hidden">{JSON.stringify(dogs)}</pre>
      </div>
    </>
  );
};

export default RarityPage;
