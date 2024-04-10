import { Dispatch, SetStateAction, createContext, useCallback, useState } from "react";

interface ScoreContextProps {
  winsByX: number;
  winsByO: number;
  draws: number;
  dispatchWinner: (winner: 'x' | 'o' | 'draw') => void;
  resetScore: () => void;
}

const ScoreContext = createContext<ScoreContextProps>({
  winsByX: 0,
  winsByO: 0,
  draws: 0,
  dispatchWinner: () => { },
  resetScore: () => { }
});

type ScoreContextProviderProps = {
  children: React.ReactNode;
};

function ScoreContextProvider({ children }: ScoreContextProviderProps) {
  const [winsByX, setWinsByX] = useState<number>(0);
  const [winsByO, setWinsByO] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);

  const dispatchWinner = useCallback((winner: 'x' | 'o' | 'draw') => {
    if (winner === 'x') setWinsByX(prev  => prev + 1)
    if (winner === 'o') setWinsByO(prev  => prev + 1)
    if (winner === 'draw') setDraws(prev  => prev + 1)
  }, []);

  const resetScore = useCallback(() => {
    setWinsByX(0);
    setWinsByO(0);
    setDraws(0);
  }, []);

  return (
    <ScoreContext.Provider value={{ winsByX, winsByO, draws, dispatchWinner, resetScore }}>
        {children}
    </ScoreContext.Provider>
  );
}

export default ScoreContextProvider;
export { ScoreContext };
export type { ScoreContextProps };
