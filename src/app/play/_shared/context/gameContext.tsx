"use client";

import { Dispatch, SetStateAction, createContext, useCallback, useContext, useState } from "react";
import { ScoreContext, ScoreContextProps } from "./scoreContext";

type PlayerTile = "x" | "o";
type Winner = "x" | "o" | "draw" | undefined;
type Tiles = Record<string, PlayerTile | undefined>;

interface GameContextProps {
  tiles: Tiles;
  winner?: Winner;
  winningTiles: string[];
  currentPlayer: PlayerTile;
  onPlay: (row: number, column: number, player: PlayerTile, tiles: Tiles) => Tiles;
  onReset: () => void;
  onCPUPlay: (cpu: PlayerTile, tiles: Tiles) => void;
  setWinningTiles: Dispatch<SetStateAction<string[]>>;
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
  onPlay: () => INITIAL_TILES,
  onReset: () => {},
  onCPUPlay: () => {},
  setWinningTiles: () => {},
});

type GameContextProviderProps = {
  children: React.ReactNode;
};

function GameContextProvider({ children }: GameContextProviderProps) {
  const { dispatchWinner } = useContext<ScoreContextProps>(ScoreContext);

  const [winner, setWinner] = useState<Winner>();
  const [tiles, setTiles] = useState<Tiles>(INITIAL_TILES);
  const [winningTiles, setWinningTiles] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerTile>("x");

  const handleOnTileClick = useCallback(
    (row: number, column: number, player: PlayerTile, tiles: Tiles) => {
      const _tiles = { ...tiles, [`row${row}-col${column}`]: player };

      const { winner: _winner, winningTiles: _winningTiles } = checkWhoIsWinner(_tiles, player);

      if (_winner) dispatchWinner(_winner);

      setTiles(_tiles);
      setWinner(_winner);
      setWinningTiles(_winningTiles);
      setCurrentPlayer(player === "o" ? "x" : "o");

      return _tiles;
    },
    [dispatchWinner],
  );

  const handleOnCPUClick = useCallback(
    async (cpu: PlayerTile, tiles: Tiles) => {
      const { row, column } = getMoveFromCPU(tiles, cpu);

      handleOnTileClick(row, column, cpu, tiles);
    },
    [handleOnTileClick],
  );

  const handleOnResetGame = useCallback(() => {
    setTiles(INITIAL_TILES);
    setWinner(undefined);
    setCurrentPlayer("x");
    setWinningTiles([]);
  }, []);

  return (
    <GameContext.Provider
      value={{
        tiles,
        winner,
        currentPlayer,
        winningTiles,
        onPlay: handleOnTileClick,
        onReset: handleOnResetGame,
        onCPUPlay: handleOnCPUClick,
        setWinningTiles,
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

const getMoveFromCPU = (tiles: Tiles, cpu: PlayerTile): { row: number; column: number } => {
  const emptyTiles: string[] = [];

  for (const tile of Object.entries(tiles)) {
    if (tile[1] === undefined) emptyTiles.push(tile[0]);
  }

  const randomIndex = Math.floor(Math.random() * emptyTiles.length);

  return parseCoordinate(emptyTiles[randomIndex]);
};

function parseCoordinate(coords: string) {
  const parts = coords.split("-");

  const row = parseInt(parts[0].substring(3));
  const column = parseInt(parts[1].substring(3));

  return { row, column };
}
