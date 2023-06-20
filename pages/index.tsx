// @ts-nocheck
import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Background from "../components/Background";
import Image from "next/image";
import sledguy from "../public/assets/sled.svg";
import useState from "react-usestateref";
import { MathJax } from "better-react-mathjax";
import { useRouter } from "next/router";

interface Score {
  id: string;
  expression: string;
  time: number;
  level: string;
  charCount: number;
  player: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const [topScores, setTopScores, topScoresRef] = useState<Score[]>([]);
  const [levels, setLevels, levelsRef] = useState<Set<string>>(new Set());
  const [highscoreType, setHighscoreType, highscoreTypeRef] =
    useState<string>("time");
  const [currentLevel, setCurrentLevel, currentLevelRef] = useState<string>("");

  async function getScores(level: string, highscoreType: string) {
    const SINERIDER_API_URL = process.env.NEXT_PUBLIC_SINERIDER_API_URL;
    const url = `${SINERIDER_API_URL}/level/${level}/${highscoreTypeRef.current};`;
    //console.log(getting scores with url: ${url})
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

  function buildMathJaxExpression(expression: string) {
    const newExpr = `\\(${String.raw`${expression}`}\\)`.toString();
    return newExpr;
  }

  async function refreshScores() {
    if (currentLevelRef.current == null || currentLevelRef.length == 0) {
      return;
    }

    getScores(currentLevelRef.current, highscoreTypeRef.current).then(
      (scores: Score[]) => {
        const validScores = scores.filter(
          (score) => score.charCount && score.time
        );
        setTopScores(
          validScores.map((score) => ({
            ...score,
            expression: buildMathJaxExpression(score.expression),
          }))
        );
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
      setLevels(new Set(levels));

      if (levels.length > 0) {
        const l = levels[0];
        setCurrentLevel(l);

        const deepLinkUrl = `/selectedLevels/${l}`;

        router.push(deepLinkUrl);
      }
      refreshScores().then(() => {});
    });
  }

  // Refresh level list on first render
  useEffect(() => {
    refreshLevels();
  }, []);

  const handleLevelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = event.target.value;
    setCurrentLevel(selectedLevel);
    refreshScores().then(() => {
      const deepLinkUrl = `/selectedLevels/${selectedLevel}`;

      router.push(deepLinkUrl);
    });
  };

  const handleHighScoreTypeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const hst = event.target.value;
    //console.log(Selected high score type: ${hst});
    setHighscoreType(hst);
    refreshScores().then();
  };

  useEffect(() => {
    getLevels().then((result) => setLevels(result));
  }, []);

  const [showFullExpression, setShowFullExpression] = useState(false);

  return (
    <>
      <Background>
        <Head>
          <title>Sinerider Leaderboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="pt-[100px]">
          <div className="md:w-[1000px] ml-auto mr-auto">
            <div className="sm:flex items-center gap-10 bg-white sm:h-[117px] h-[200px] ml-2 mr-2 rounded-[12px]  sm:w-full w-[95%] justify-between px-5 py-3">
              <div className="flex items-center gap-10">
                <div>
                  <Image src={sledguy} alt="sled" height={90} width={90} />
                </div>
                <div className="font-mono sm:text-[54px] text-[32px]">
                  SineRider
                </div>
              </div>
              <div>
                <div className="flex gap-2 sm:mt-0 mt-5 items-center">
                  <div className="flex pl-1.5 ">Puzzle</div>
                  <select
                    className="w-[255px] pl-2"
                    onChange={handleLevelSelect}
                  >
                    {[...levels].map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 items-center pt-2">
                  <div className="flex items-center gap-10">Rank by</div>
                  <select
                    className="w-[250px] pl-2"
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
          <div className="md:w-[800px] ml-auto mr-auto pt-[50px]">
            <div
              className={`bg-white flex sm:h-[50px] h-[50px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5}`}
            >
              <div className="sm:text-[16px] text-[12px]">Position</div>
              <div className="sm:text-[16px] text-[12px]">Name</div>
              <div className="sm:text-[16px] text-[12px]">Expression</div>
              <div className="sm:text-[16px] text-[12px]">
                {makeTypePretty(highscoreType)}
              </div>
            </div>
            {topScores.length === 0 && (
              <div className="text-center font-extrabold text-[32px] text-white pt-5">
                No Scores Available
              </div>
            )}
          </div>

          <div className="md:w-[800px] ml-auto mr-auto">
            {topScores.map((score, index) => (
              <div
                key={score.id}
                className={`bg-white flex sm:h-[117px] h-[90px] ml-2 mr-2 rounded-[12px] justify-between items-center sm:ml-5 sm:mr-5 px-10 mt-5 gap-2 ${
                  index > 0 ? "4" : "0"
                }`}
              >
                <div style={{ fontSize: 30, fontWeight: "bold" }}>
                  #{index + 1}
                </div>
                <div
                  style={{
                    paddingLeft: "30px",
                    textAlign: "left",
                  }}
                  className="sm:text-[28px}] text-[12px]"
                >
                  {score.player.length > 0 ? score.player : "NO_NAME"}
                </div>
                <div className="text-right relative">
                  <div
                    className="cursor-pointer sm:text-[28px]] text-[12px]"
                    title={score.expression}
                  >
                    {score.expression.length <= 100 ? (
                      <MathJax>{score.expression} </MathJax>
                    ) : (
                      <>
                        {`${score.expression.substring(0, 15)}${
                          score.expression.length > 15 ? "..." : ""
                        }`}
                      </>
                    )}
                  </div>
                </div>

                <div
                  style={{ textAlign: "center" }}
                  className="sm:text-[28px}] text-[12px]"
                >
                  {getRating(score)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="text-center text-white bottom-2 fixed flex w-full justify-center">
          <a
            href="https://github.com/hackclub/sinerider-leaderboard#readme"
            className="hover:underline"
          >
            <div className="text-center ">
              Built and maintained by teenagers. Version 0.5
            </div>
          </a>
        </footer>
      </Background>
    </>
  );
};

export default Home;