"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/contexts/player-context";

export function LyricsView({ lines }) {
  const { currentTime } = usePlayer();
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);

  // encontra qual linha deve estar em destaque, com base no tempo atual
  const activeIndex = lines.reduce((acc, line, index) => {
    return currentTime >= line.time ? index : acc;
  }, -1);

  // sempre que a linha ativa mudar, rola suavemente até ela
  useEffect(() => {
    activeLineRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeIndex]);

  if (lines.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border p-8 text-center text-muted-foreground">
        Letra não disponível para esta música.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="max-h-[480px] overflow-y-auto rounded-xl border border-border p-6"
    >
      <div className="flex flex-col gap-4">
        {lines.map((line, index) => (
          <p
            key={index}
            ref={index === activeIndex ? activeLineRef : null}
            className={`text-lg transition-all duration-300 ${
              index === activeIndex
                ? "scale-105 font-semibold text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}