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

  if (char === " ") {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>;
  }

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

export function HeroTitle() {
  const title = "My Projects";
  const subtitle = "Self-hosted applications powered by ";
  const brand = "Shoka";

  const titleDelay = 80;
  const subtitleStart = title.length * titleDelay + 200;
  const subtitleDelay = 25;
  const brandStart = subtitleStart + subtitle.length * subtitleDelay + 100;
  const brandDelay = 100;

  return (
    <div className="mb-12 text-center">
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title.split("").map((char, i) => (
          <AnimatedLetter
            key={`t-${i}`}
            char={char}
            delay={i * titleDelay}
          />
        ))}
      </h1>
      <p className="text-lg text-gray-400">
        {subtitle.split("").map((char, i) => (
          <AnimatedLetter
            key={`s-${i}`}
            char={char}
            delay={subtitleStart + i * subtitleDelay}
          />
        ))}
        {brand.split("").map((char, i) => (
          <AnimatedLetter
            key={`b-${i}`}
            char={char}
            delay={brandStart + i * brandDelay}
            isShimmer
          />
        ))}
      </p>
    </div>
  );
}
