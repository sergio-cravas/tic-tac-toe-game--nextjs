import { useCallback, useContext, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Text, Button, OIcon, XIcon } from "@/ui";
import { GameContextProps, GameContext } from "@/app/play/_shared/context/gameContext";
import { ScoreContext, ScoreContextProps } from "@/app/play/_shared/context/scoreContext";

import styles from "./winBanner.module.scss";

export const WinBanner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { resetScore } = useContext<ScoreContextProps>(ScoreContext);
  const { winner, onReset } = useContext<GameContextProps>(GameContext);

  const [confirmQuitVisible, setConfirmQuitVisible] = useState<boolean>(false);

  const resultMessage = useMemo(
    () => (searchParams.get("p1") === winner ? "You won!" : "Oh no, you lost"),
    [winner, searchParams],
  );

  const handleOnQuit = useCallback(() => {
    setConfirmQuitVisible(true);
  }, []);

  const handleOnConfirmQuit = useCallback(() => {
    onReset();
    resetScore();

    setConfirmQuitVisible(false);

    router.push("/");
  }, [router, onReset, resetScore]);

  const handleOnCancelQuit = useCallback(() => {
    setConfirmQuitVisible(false);
  }, []);

  if (!winner) return <></>;

  return (
    <div className={styles["win-banner"]}>
      <div className={styles["win-banner__background"]} />

      <div className={styles["win-banner__banner"]}>
        {!confirmQuitVisible && (
          <Text variant="heading" size="extra-small" content={resultMessage} className={styles["win-banner__banner__title"]} />
        )}

        {!confirmQuitVisible && (
          <div className={styles["win-banner__banner__winner"]}>
            {winner === "o" ? <OIcon /> : winner === "x" && <XIcon />}

            <Text
              variant="heading"
              size="large"
              color={winner === "o" ? "yellow" : winner === "x" ? "blue" : undefined}
              content={winner === "draw" ? "Round tied" : "takes the round"}
            />
          </div>
        )}

        {confirmQuitVisible && (
          <div className={styles["win-banner__banner__winner"]}>
            <Text variant="heading" size="large" content="Restart game?" />
          </div>
        )}

        <div className={styles["win-banner__banner__buttons"]}>
          <Button
            color="gray"
            label={confirmQuitVisible ? "NO, CANCEL" : "QUIT"}
            onClick={confirmQuitVisible ? handleOnCancelQuit : handleOnQuit}
          />

          <Button
            label={confirmQuitVisible ? "YES, RESTART" : "NEXT ROUND"}
            onClick={confirmQuitVisible ? handleOnConfirmQuit : onReset}
          />
        </div>
      </div>
    </div>
  );
};
