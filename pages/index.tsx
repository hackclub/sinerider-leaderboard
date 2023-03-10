import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Background from "../components/Background";

interface Score {
  id: string;
  expression: string;
  T: number;
  level: string;
  charCount: number;
}

const Home: NextPage = () => {
  const [topScores, setTopScores] = useState<Score[]>([]);
  useEffect(() => {
    fetch("https://sinerider-scoring.up.railway.app//all")
      .then((response) => response.json())
      .then((data) => {
        const scores = data.scores; // Get the scores array from the response data
        // Sort scores by T and charCount in ascending order
        const sortedScores = scores.sort(
          (a: Score, b: Score) => a.T - b.T || a.charCount - b.charCount
        );
        // Take the top 5 scores
        const top5Scores = sortedScores.slice(0, 5);
        setTopScores(top5Scores);
      });
  }, []);

  console.log("Top 5 scores:", topScores);

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
            {topScores.map((score, index) => (
              <div
                key={score.id}
                className={`bg-white flex sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5 ${
                  index > 0 ? "5" : "0"
                }`}
              >
                <div className="font-bold font-mono sm:text-[48px] text-[22px]">
                  {index + 1}
                </div>
                <div>Player name</div>
                <div className="sm:text-[52px] text-[22px] font-bold font-mono">
                  {score.T.toFixed(2)}
                </div>
                <div>image</div>
              </div>
            ))}
          </div>
        </div>
      </Background>
    </>
  );
};

export default Home;
