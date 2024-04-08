import { Dispatch, SetStateAction, createContext, useCallback, useState } from "react";

type PlayerTile = "x" | "o";

interface GameContextProps {
  winner?: PlayerTile | 'draw';
  currentPlayer: PlayerTile;
  tiles: Record<string, PlayerTile | undefined>;
  winningTiles: string[];
  onPlay: (row: number, column: number) => void;
  onReset: () => void;
  setWinningTiles: Dispatch<SetStateAction<string[]>>;
}

const INITIAL_TILES: Record<string, PlayerTile | undefined> = {
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
  onPlay: () => { },
  onReset: () => { },
  setWinningTiles: () => { },
});

type GameContextProviderProps = {
  children: React.ReactNode;
};

function GameContextProvider({ children }: GameContextProviderProps) {
  const [winner, setWinner] = useState<any>();
  const [winningTiles, setWinningTiles] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerTile>("x");
  const [tiles, setTiles] = useState<Record<string, PlayerTile | undefined>>(INITIAL_TILES);

  const handleOnTileClick = useCallback(
    (row: number, column: number) => {
      let newTiles = { ...tiles, [`row${row}-col${column}`]: currentPlayer };

      const { winner, winningTiles: _winningTiles } = checkWhoIsWinner(newTiles, currentPlayer);

      setWinner(winner);
      setWinningTiles(_winningTiles)
      setTiles(newTiles);
      setCurrentPlayer((prev) => (prev === "o" ? "x" : "o"));
    },
    [tiles, currentPlayer],
  );

  const handleOnResetGame = useCallback(() => {
    setTiles(INITIAL_TILES);
    setWinner(undefined);
    setCurrentPlayer("x");
    setWinningTiles([]);
  }, []);

  return (
    <GameContext.Provider value={{ tiles, winner, currentPlayer, winningTiles, onPlay: handleOnTileClick, onReset: handleOnResetGame, setWinningTiles }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
export { GameContext };
export type { GameContextProps };

const checkWhoIsWinner = (tiles: Record<string, PlayerTile | undefined>, player: PlayerTile): { winner: PlayerTile | "draw" | undefined, winningTiles: string[] } => {
  let winningTiles: string[] = [];
  let isPlayerWinner: boolean = false;

  for (let index = 0; index < 3; index++) {
    if ([tiles[`row${index}-col${0}`], tiles[`row${index}-col${1}`], tiles[`row${index}-col${2}`]].every((item) => item && item === player)) {
      isPlayerWinner = true;
      winningTiles = [`row${index}-col${0}`, `row${index}-col${1}`, `row${index}-col${2}`];
      break;
    }
  }

  if (!isPlayerWinner) {
    for (let index = 0; index < 3; index++) {
      if ([tiles[`row${0}-col${index}`], tiles[`row${1}-col${index}`], tiles[`row${2}-col${index}`]].every((item) => item && item === player)) {
        isPlayerWinner = true;
        winningTiles = [`row${0}-col${index}`, `row${1}-col${index}`, `row${2}-col${index}`];
        break;
      }
    }
  }

  if (!isPlayerWinner) {
    if ([tiles[`row${0}-col${0}`], tiles[`row${1}-col${1}`], tiles[`row${2}-col${2}`]].every((item) => item && item === player)) {
      isPlayerWinner = true;
      winningTiles = [`row${0}-col${0}`, `row${1}-col${1}`, `row${2}-col${2}`];
    }

    if ([tiles[`row${2}-col${0}`], tiles[`row${1}-col${1}`], tiles[`row${0}-col${2}`]].every((item) => item && item === player)) {
      isPlayerWinner = true;
      winningTiles = [`row${2}-col${0}`, `row${1}-col${1}`, `row${0}-col${2}`];
    }
  }

  if (!isPlayerWinner && Object.values(tiles).every(item => item !== undefined)) return { winner: 'draw', winningTiles };
  else if (isPlayerWinner) return { winner: player, winningTiles };
  else return { winner: undefined, winningTiles };
};
