"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import GameContextProvider from "./gameContext";
import ScoreContextProvider from "./scoreContext";

type Props = {
  children: React.ReactNode;
};

export default function GlobalProvider({ children }: Props) {
  const searchParams = useSearchParams();

  const gameMode = useMemo(() => (searchParams.get("mode") === "pve" ? "pve" : "pvp"), [searchParams]);
  const initialPlayer = useMemo(() => (searchParams.get("p1") === "o" ? "o" : "x"), [searchParams]);

  return (
    <ScoreContextProvider>
      <GameContextProvider gameMode={gameMode} initialPlayer={initialPlayer}>
        <Suspense>{children}</Suspense>
      </GameContextProvider>
    </ScoreContextProvider>
  );
}
