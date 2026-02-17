"use client";

import { useEffect, useState } from "react";

interface RevealCardProps {
  children: React.ReactNode;
  delay: number;
}

export function RevealCard({ children, delay }: RevealCardProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        filter: revealed ? "blur(0px)" : "blur(12px)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `filter 0.8s ease-out, opacity 0.8s ease-out, transform 0.8s ease-out`,
      }}
    >
      {children}
    </div>
  );
}
