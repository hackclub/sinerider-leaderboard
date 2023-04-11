import { useState, useEffect } from "react";
import Image from "next/image";

export default function RandomCharacter() {
  const [character, setCharacter] = useState("");

  const characters = [
    "/assets/characters/ada.png",
    "/assets/characters/crow.png",
    "/assets/characters/lavaMonster.png",
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];
    setCharacter(randomCharacter);
  }, []);

  return (
    <Image src={character} alt="Random character" height={90} width={90} />
  );
}
