// @ts-nocheck
import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Background from "../components/Background";
import Image from "next/image";
import sledguy from "../public/assets/sled.svg";
import useState from "react-usestateref";

interface Score {
  id: string;
  expression: string;
  time: number;
  level: string;
  charCount: number;
  player: string;
}

const Home: NextPage = () => {
  const [topScores, setTopScores, topScoresRef] = useState<Score[]>([]);
  const [levels, setLevels, levelsRef] = useState<Set<string>>(new Set());
  const [highscoreType, setHighscoreType, highscoreTypeRef] =
    useState<string>("time");
  const [currentLevel, setCurrentLevel, currentLevelRef] = useState<string>("");

  async function getScores(level: string, highscoreType: string) {
    const SINERIDER_API_URL = process.env.NEXT_PUBLIC_SINERIDER_API_URL;
    const url = `${SINERIDER_API_URL}/level/${level}/${highscoreTypeRef.current}`;
    //console.log(`getting scores with url: ${url}`)
    const response = await fetch(url);
    const data = await response.json();
    return data.scores;
  }

  async function getLevels(level: string) {
    const SINERIDER_API_URL = process.env.NEXT_PUBLIC_SINERIDER_API_URL;
    const response = await fetch(`${SINERIDER_API_URL}/levels`);
    const data = await response.json();
    return data.levels as string[];
  }

  async function refreshScores() {
    if (currentLevelRef.current == null || currentLevelRef.length == 0) {
      return;
    }

    getScores(currentLevelRef.current, highscoreTypeRef.current).then(
      (scores) => {
        setTopScores(scores);
      }
    );
  }

  function makeTypePretty() {
    switch (highscoreTypeRef.current) {
      case "time":
        return "Time";
      case "charCount":
        return "Length";
    }
  }

  function getRating(score: Score) {
    switch (highscoreTypeRef.current) {
      case "time":
        return "time" in score ? score.time.toFixed(3) : "<undefined>";
      case "charCount":
        return "charCount" in score ? score.charCount : "<undefined>";
    }
    return "<undefined>";
  }

  function refreshLevels() {
    getLevels().then((levels) => {
      //console.log("Levels: " + levels);
      setLevels(new Set(levels));

      if (levels.length > 0) {
        const l = levels[0];
        //console.log("Current level: " + l)
        setCurrentLevel(l);
      }
      refreshScores().then();
    });
  }

  // Refresh level list on first render
  useEffect(() => {
    refreshLevels();
  }, []);

  const handleLevelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = event.target.value;
    //console.log(`Selected level: ${selectedLevel}`);
    setCurrentLevel(selectedLevel);
    refreshScores().then();
  };

  const handleHighScoreTypeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const hst = event.target.value;
    //console.log(`Selected high score type: ${hst}`);
    setHighscoreType(hst);
    refreshScores().then();
  };

  return (
    <>
      <Background>
        <Head>
          <title>SineRider Leaderboard</title>
        </Head>
        <div className="pt-[100px]">
          <div className="md:w-[1000px] ml-auto mr-auto">
            <div className="flex place-items-center bg-white sm:h-28 h-24 rounded-xl sm:w-full justify-between px-8 py-4">
              <div className="flex space-x-16 place-items-center">
                <div>
                  <Image src={sledguy} alt="sled" height={90} width={90} />
                </div>
                <div className="sm:text-5xl text-2xl">
                  SineRider
                </div>
              </div>
              <div>
                <div>
                  <p className="float-left text-right pr-5 font-bold">
                    Challenges
                  </p>
                  <select
                      className="w-64"
                      onChange={handleLevelSelect}
                  >
                    {[...levels].map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="float-left text-right pr-5 font-bold">
                    Rank by
                  </p>
                  <select
                      className="w-64 float-right"
                      onChange={handleHighScoreTypeSelect}
                  >
                    <option key="time" value="time">
                      Time
                    </option>
                    <option key="charCount" value="charCount">
                      Length
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div
            className="md:w-[800px] ml-auto mr-auto"
          >
            <div
              className="bg-white flex sm:h-[50px] h-[50px] m-2 rounded-xl justify-between items-center sm:m-5 px-10 mt-5"
            >
              <div style={{ width: "50px", textAlign: "center" }}>Position</div>
              <div
                style={{
                  paddingLeft: "30px",
                  width: "200px",
                  textAlign: "left",
                }}
              >
                Name
              </div>
              <div style={{ width: "400px", textAlign: "center" }}>
                {makeTypePretty(highscoreType)}
              </div>
            </div>
          </div>

          <div className="md:w-[800px] ml-auto mr-auto">
            {topScores.map((score, index) => (
                <div
                    key={score.id}
                    className={`bg-white flex h-[90px] m-2 rounded-xl justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5 ${
                        index > 0 ? "4" : "0"
                    } ${index % 2 == 0 && "sm:h-[117px] mb-10"}`}
                >
                  <div
                      className="text-4xl font-bold"
                  >
                    #{index + 1}
                  </div>
                  <div
                      style={{
                        paddingLeft: "30px",
                        width: "200px",
                        textAlign: "left",
                      }}
                  >
                    {score.player.length > 0 ? score.player : "NO_NAME"}
                  </div>
                  <div style={{ width: "400px", textAlign: "center" }}>
                    {getRating(score)}
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