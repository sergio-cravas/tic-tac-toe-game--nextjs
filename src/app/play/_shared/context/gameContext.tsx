"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { ScoreContext, ScoreContextProps } from "./scoreContext";

type PlayerTile = "x" | "o";
type GameMode = "pvp" | "pve";
type Winner = "x" | "o" | "draw" | undefined;
type Tiles = Record<string, PlayerTile | undefined>;

interface GameContextProps {
  tiles: Tiles;
  winner?: Winner;
  winningTiles: string[];
  currentPlayer: PlayerTile;
  isCPUPlaying: boolean;
  onPlay: (row: number, column: number) => void;
  onReset: () => void;
}

const INITIAL_TILES: Tiles = {
  "row0-col0": undefined,
  "row0-col1": undefined,
  "row0-col2": undefined,
  "row1-col0": undefined,
  "row1-col1": undefined,
  "row1-col2": undefined,
  "row2-col0": undefined,
  "row2-col1": undefined,
  "row2-col2": undefined,
};

const GameContext = createContext<GameContextProps>({
  winningTiles: [],
  currentPlayer: "x",
  tiles: INITIAL_TILES,
  isCPUPlaying: false,
  onPlay: () => {},
  onReset: () => {},
});

type GameContextProviderProps = {
  gameMode?: GameMode;
  initialPlayer?: PlayerTile;
  children: React.ReactNode;
};

function GameContextProvider({ initialPlayer = "x", gameMode = "pvp", children }: GameContextProviderProps) {
  const { dispatchWinner } = useContext<ScoreContextProps>(ScoreContext);

  const [tiles, setTiles] = useState<Tiles>(INITIAL_TILES);
  const [winner, setWinner] = useState<Winner>();
  const [winningTiles, setWinningTiles] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerTile>(initialPlayer);
  const [isCPUPlaying, setIsCPUPlaying] = useState<boolean>(false);

  const onTileClick = useCallback(
    (row: number, column: number, player: PlayerTile, tiles: Tiles): { tiles: Tiles; winner?: Winner } => {
      const _tiles = { ...tiles, [`row${row}-col${column}`]: player };

      const { winner: _winner, winningTiles: _winningTiles } = checkWhoIsWinner(_tiles, player);

      if (_winner) {
        dispatchWinner(_winner);
      }

      setTiles(_tiles);
      setWinner(_winner);
      setWinningTiles(_winningTiles);
      setCurrentPlayer(player === "o" ? "x" : "o");

      return { tiles: _tiles, winner: _winner };
    },
    [dispatchWinner],
  );

  const onCPUClick = useCallback(
    (cpu: PlayerTile, tiles: Tiles) => {
      if (winner) return;

      const coords = getMoveFromCPU(tiles, cpu);

      if (coords) {
        onTileClick(coords.row, coords.column, cpu, tiles);
      }
    },
    [winner, onTileClick],
  );

  const handleOnResetGame = useCallback(() => {
    setTiles(INITIAL_TILES);
    setWinner(undefined);
    setWinningTiles([]);
    setCurrentPlayer(initialPlayer);
    setIsCPUPlaying(false);
  }, [initialPlayer]);

  const handleOnPlay = useCallback(
    (row: number, column: number) => {
      const { tiles: newTiles, winner: newWinner } = onTileClick(row, column, currentPlayer, tiles);

      if (!newWinner && gameMode === "pve") {
        setIsCPUPlaying(true);

        setTimeout(() => {
          onCPUClick(initialPlayer === "x" ? "o" : "x", newTiles);
          setIsCPUPlaying(false);
        }, 500);
      }
    },
    [gameMode, initialPlayer, tiles, currentPlayer, onCPUClick, onTileClick],
  );

  return (
    <GameContext.Provider
      value={{
        tiles,
        winner,
        winningTiles,
        currentPlayer,
        isCPUPlaying,
        onPlay: handleOnPlay,
        onReset: handleOnResetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
export { GameContext };
export type { GameContextProps };

const checkWhoIsWinner = (
  tiles: Record<string, PlayerTile | undefined>,
  player: PlayerTile,
): { winner: PlayerTile | "draw" | undefined; winningTiles: string[] } => {
  let winningTiles: string[] = [];
  let isPlayerWinner: boolean = false;

  for (let index = 0; index < 3; index++) {
    if (
      [tiles[`row${index}-col${0}`], tiles[`row${index}-col${1}`], tiles[`row${index}-col${2}`]].every(
        (item) => item && item === player,
      )
    ) {
      isPlayerWinner = true;
      winningTiles = [`row${index}-col${0}`, `row${index}-col${1}`, `row${index}-col${2}`];
      break;
    }
  }

  if (!isPlayerWinner) {
    for (let index = 0; index < 3; index++) {
      if (
        [tiles[`row${0}-col${index}`], tiles[`row${1}-col${index}`], tiles[`row${2}-col${index}`]].every(
          (item) => item && item === player,
        )
      ) {
        isPlayerWinner = true;
        winningTiles = [`row${0}-col${index}`, `row${1}-col${index}`, `row${2}-col${index}`];
        break;
      }
    }
  }

  if (!isPlayerWinner) {
    if (
      [tiles[`row${0}-col${0}`], tiles[`row${1}-col${1}`], tiles[`row${2}-col${2}`]].every((item) => item && item === player)
    ) {
      isPlayerWinner = true;
      winningTiles = [`row${0}-col${0}`, `row${1}-col${1}`, `row${2}-col${2}`];
    }

    if (
      [tiles[`row${2}-col${0}`], tiles[`row${1}-col${1}`], tiles[`row${0}-col${2}`]].every((item) => item && item === player)
    ) {
      isPlayerWinner = true;
      winningTiles = [`row${2}-col${0}`, `row${1}-col${1}`, `row${0}-col${2}`];
    }
  }

  if (!isPlayerWinner && Object.values(tiles).every((item) => item !== undefined)) return { winner: "draw", winningTiles };
  else if (isPlayerWinner) return { winner: player, winningTiles };
  else return { winner: undefined, winningTiles };
};

const getMoveFromCPU = (tiles: Tiles, cpu: PlayerTile): { row: number; column: number } | undefined => {
  const emptyTiles: string[] = [];

  for (const tile of Object.entries(tiles)) {
    if (tile[1] === undefined) emptyTiles.push(tile[0]);
  }

  if (emptyTiles.length === 0) return undefined;

  // Random selection
  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  // TODO
  // Use "cpu" variable to search more accurate selection.

  return parseCoordinate(emptyTiles[randomIndex]);
};

function parseCoordinate(coords: string) {
  const parts = coords.split("-");

  const row = parseInt(parts[0].substring(3));
  const column = parseInt(parts[1].substring(3));

  return { row, column };
}
