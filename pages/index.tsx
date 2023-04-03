import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Background from "../components/Background";
import Image from "next/image";
import sledguy from "../public/assets/sled.svg";

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
    fetch("https://sinerider-api.herokuapp.com/all")
      .then((response) => response.json())
      .then((data) => {
        const scores = data.scores; // Get the scores array from the response data
        // Sort scores by T and charCount in ascending order
        const sortedScores = scores.sort(
          (a: Score, b: Score) => a.T - b.T || a.charCount - b.charCount
        );
        // Take the top 4 scores
        const top5Scores = sortedScores.slice(0, 4);
        setTopScores(top5Scores);
      });
  }, []);

  console.log("Top 4 scores:", topScores);

  return (
    <>
      <Background>
        <Head>
          <title>Sinerider Leaderboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="pt-[100px]">
          <div className="md:w-[1200px] ml-auto mr-auto">
            <div className="flex items-center gap-10 bg-white sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px]  sm:ml-5 sm:mr-5 px-10 mt-5">
              <div>
                <Image src={sledguy} width={109} height={116} alt="sled" />
              </div>

              <div className="font-mono text-[62px]">SinerRider</div>
            </div>
          </div>
          <div className="md:w-[1200px] ml-auto mr-auto">
            {topScores.map((score, index) => (
              <div
                key={score.id}
                className={`bg-white flex sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5 ${
                  index > 0 ? "4" : "0"
                }`}
              >
                <div className="font-bold font-mono sm:text-[48px] text-[22px]">
                  {index + 1}
                </div>
                <div>Player name</div>
                <div className="sm:text-[52px] text-[22px] font-bold font-mono">
                  {score.T ? score.T.toFixed(2) : ""}
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
