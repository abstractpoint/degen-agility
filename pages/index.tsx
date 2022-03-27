import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Degen Agility" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <p>
          Go to <Link href="/rarity">rarity</Link>
        </p>
      </main>
    </div>
  );
};

export default Home;
