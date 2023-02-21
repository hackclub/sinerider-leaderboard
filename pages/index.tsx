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
          <div className="bg-[rgba(255,255,255,0.4)] h-[850px] md:w-[1200px] ml-auto mr-auto rounded-[12px]">
            <div className="text-center">
              <button className="text-center font-bold text-[32px] justify-center bg-white rounded-[8px] pl-20 pr-20 py-2 cursor-none relative bottom-8">
                Leaderboard
              </button>
            </div>
            <div className="bg-white flex sm:h-[127px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10">
              <div className="font-bold font-mono sm:text-[64px] text-[32px]">
                1
              </div>
              <div>Player name</div>
              <div>score</div>
              <div>image</div>
            </div>
            <div className="bg-white flex sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5">
              <div className="font-bold font-mono sm:text-[48px] text-[22px]">
                2
              </div>
              <div>Player name</div>
              <div>score</div>
              <div>image</div>
            </div>
            <div className="bg-white flex sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5">
              <div className="font-bold font-mono sm:text-[48px] text-[22px]">
                3
              </div>
              <div>Player name</div>
              <div>score</div>
              <div>image</div>
            </div>
            <div className="bg-white flex sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5">
              <div className="font-bold font-mono sm:text-[48px] text-[22px]">
                4
              </div>
              <div>Player name</div>
              <div>score</div>
              <div>image</div>
            </div>
            <div className="bg-white flex sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5">
              <div className="font-bold font-mono sm:text-[48px] text-[22px]">
                5
              </div>
              <div>Player name</div>
              <div>score</div>
              <div>image</div>
            </div>
          </div>
        </div>
      </Background>
    </>
  );
};

export default Home;
