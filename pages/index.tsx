// @ts-nocheck
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
  const [levels, setLevels] = useState<Set<string>>(new Set()); 

  useEffect(() => {
    fetch("https://sinerider-api.herokuapp.com/all")
      .then((response) => response.json())
      .then((data) => {
        const scores = data.scores;
        const sortedScores = scores.sort(
          (a: Score, b: Score) => a.T - b.T || a.charCount - b.charCount
        );
        const top4Scores = sortedScores.slice(0, 4);
        setTopScores(top4Scores);

       
        const levels = new Set(scores.map((score: Score) => score.level));
        setLevels(levels);
      });
  }, []);

  console.log("Top 4 scores:", topScores);
  console.log("Levels:", levels);

  const handleLevelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = event.target.value;
    console.log(`Selected level: ${selectedLevel}`);
    fetch(`https://sinerider-api.herokuapp.com/level/${selectedLevel}`)
      .then((response) => response.json())
      .then((data) => {
        const scores = data.scores;
        const sortedScores = scores.sort(
          (a: Score, b: Score) => a.T - b.T || a.charCount - b.charCount
        );
        const top4Scores = sortedScores.slice(0, 4);
        setTopScores(top4Scores);
      });
  };

  return (
    <>
      <Background>
        <Head>
          <title>Sinerider Leaderboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="pt-[100px]">
          <div className="md:w-[1200px] ml-auto mr-auto">
            <div className="flex items-center gap-10 bg-white sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px]  sm:w-full w-[90%] justify-between px-5 py-3">
              <div className="flex items-center gap-10">
                <div>
              <Image src={sledguy} alt="sled" height={90} width={90} />
              </div>
              <div className="font-mono sm:text-[54px] text-[22px]">
              SineRider
              </div>
              </div>
              <div>
                <select
                  
                  onChange={handleLevelSelect}
                >
                  <option value="">All time</option>
                  {[...levels].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="md:w-[1200px] ml-auto mr-auto">
            {topScores.map((score, index) => (
              <div
                key={score.id}
                className={`bg-white flex sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5 ${
                  index > 0 ? "4"
 : "0"
                }`}
              >
                <div className="font-bold font-mono sm:text-[48px] text-[22px]">
                  {index + 1}
                </div>
                <div>Player name</div>
                <div> </div> <span>plays</span>
                <div></div>{score.charCount} <span>char</span>
                <div className="flex items-center">
                <div className="sm:text-[52px] text-[22px] font-bold font-mono">
                {score.T ? parseInt((score.T * 60).toString()) : ""}
                </div>
                <span >seconds</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Background>
    </>
  );
};

export default Home;
