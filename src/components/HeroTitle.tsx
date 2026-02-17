"use client";

import { useEffect, useState } from "react";

function AnimatedLetter({
  char,
  delay,
}: {
  char: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (char === " ") {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>;
  }

  return (
    <span
      className={`hero-letter inline-block transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-4 blur-sm"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {char}
    </span>
  );
}

export function HeroTitle() {
  const title = "My Projects";
  const subtitle = "Self-hosted applications powered by ";
  const brand = "Shoka";

  return (
    <div className="mb-12 text-center">
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title.split("").map((char, i) => (
          <AnimatedLetter key={`t-${i}`} char={char} delay={i * 60} />
        ))}
      </h1>
      <p className="text-lg text-gray-400">
        {subtitle.split("").map((char, i) => (
          <AnimatedLetter
            key={`s-${i}`}
            char={char}
            delay={title.length * 60 + i * 30}
          />
        ))}
        {brand.split("").map((char, i) => (
          <span
            key={`b-${i}`}
            className="hero-letter text-shimmer-inline inline-block font-semibold opacity-0 translate-y-4 blur-sm animate-fade-up"
            style={{
              animationDelay: `${title.length * 60 + subtitle.length * 30 + i * 80}ms`,
              animationFillMode: "forwards",
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
}
