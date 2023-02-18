import type { NextPage } from "next";
import Head from "next/head";
import Background from "../components/Background";

const Home: NextPage = () => {
  return (
    <>
      <Background>
        <Head>
          <title>Sinerider Leaderboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="pt-[100px]">
          <div className="bg-[#FFFFFF] h-[850px] opacity-40 sm:w-[1500px] ml-auto mr-auto rounded-[12px]">
            <div className="text-center">
            <button className="text-center font-bold text-[32px] relative bottom-7 justify-center bg-blue-500 rounded-[12px] pl-20 pr-20 py-2 cursor-none">
              Leaderboard
            </button>
            </div>
          </div>
        </div>
      </Background>
    </>
  );
};

export default Home;
