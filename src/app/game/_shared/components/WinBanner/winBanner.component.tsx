import { useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { Text } from "@/ui/Text/text";
import { OIcon } from "@/ui/OIcon/oIcon";
import { XIcon } from "@/ui/XIcon/xIcon";
import { Button } from "@/ui/Button/button";
import { GameContextProps, GameContext } from "@/app/game/_shared/context/gameContext";
import { ScoreContext, ScoreContextProps } from "@/app/game/_shared/context/scoreContext";

import styles from "./winBanner.module.scss";

export const WinBanner = () => {
  const router = useRouter();

  const { resetScore } = useContext<ScoreContextProps>(ScoreContext);
  const { winner, onReset } = useContext<GameContextProps>(GameContext);

  const [confirmQuitVisible, setConfirmQuitVisible] = useState<boolean>(false);

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
          <Text
            variant="heading"
            size="extra-small"
            content="Oh no, you lost"
            className={styles["win-banner__banner__title"]}
          />
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
