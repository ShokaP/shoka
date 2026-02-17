"use client";

import { useEffect, useState } from "react";

function AnimatedLetter({
  char,
  delay,
  isShimmer,
}: {
  char: string;
  delay: number;
  isShimmer?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`hero-letter inline-block transition-all duration-700 ease-out ${
        isShimmer ? "text-shimmer-inline font-semibold" : ""
      }`}
      style={{
        filter: revealed ? "blur(0px)" : "blur(8px)",
        opacity: revealed ? 1 : 0.15,
        transform: revealed ? "scale(1)" : "scale(0.9)",
        transition: `filter 0.7s ease-out ${delay}ms, opacity 0.7s ease-out ${delay}ms, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`,
      }}
    >
      {char}
    </span>
  );
}

function AnimatedWord({
  word,
  startDelay,
  letterDelay,
  isShimmer,
}: {
  word: string;
  startDelay: number;
  letterDelay: number;
  isShimmer?: boolean;
}) {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split("").map((char, i) => (
        <AnimatedLetter
          key={i}
          char={char}
          delay={startDelay + i * letterDelay}
          isShimmer={isShimmer}
        />
      ))}
    </span>
  );
}

export function HeroTitle() {
  const title = "My Projects";
  const subtitle = "Self-hosted applications powered by";
  const brand = "Shoka";

  const titleWords = title.split(" ");
  const subtitleWords = subtitle.split(" ");

  const titleDelay = 80;
  const subtitleDelay = 25;
  const brandDelay = 100;

  let charIndex = 0;

  const titleElements = titleWords.map((word, wi) => {
    const delay = charIndex * titleDelay;
    charIndex += word.length;
    const el = (
      <AnimatedWord
        key={`tw-${wi}`}
        word={word}
        startDelay={delay}
        letterDelay={titleDelay}
      />
    );
    if (wi < titleWords.length - 1) {
      charIndex += 1;
    }
    return el;
  });

  const subtitleStart = charIndex * titleDelay + 200;
  let subCharIndex = 0;

  const subtitleElements = subtitleWords.map((word, wi) => {
    const delay = subtitleStart + subCharIndex * subtitleDelay;
    subCharIndex += word.length;
    const el = (
      <AnimatedWord
        key={`sw-${wi}`}
        word={word}
        startDelay={delay}
        letterDelay={subtitleDelay}
      />
    );
    if (wi < subtitleWords.length - 1) {
      subCharIndex += 1;
    }
    return el;
  });

  const brandStart = subtitleStart + subCharIndex * subtitleDelay + 100;

  return (
    <div className="mb-12 text-center">
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {titleElements.map((el, i) => (
          <span key={i}>
            {el}
            {i < titleElements.length - 1 && " "}
          </span>
        ))}
      </h1>
      <p className="text-lg text-gray-400">
        {subtitleElements.map((el, i) => (
          <span key={i}>
            {el}
            {" "}
          </span>
        ))}
        <AnimatedWord
          word={brand}
          startDelay={brandStart}
          letterDelay={brandDelay}
          isShimmer
        />
      </p>
    </div>
  );
}
