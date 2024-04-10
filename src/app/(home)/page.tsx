"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Text } from "@/ui/Text/text";
import { Logo } from "@/ui/Logo/logo";
import { OIcon } from "@/ui/OIcon/oIcon";
import { XIcon } from "@/ui/XIcon/xIcon";
import { Button } from "@/ui/Button/button";

import styles from "./page.module.scss";
import colors from "@/theme/colors.module.scss";

export default function Home() {
  const router = useRouter();

  const [playerSelected, setPlayedSelected] = useState<"x" | "o">("x");

  const handleOnStartNewGame = useCallback(
    (mode: "pvp" | "pve") => {
      router.push(`/game?pj_1=${playerSelected}&mode=${mode}`);
    },
    [router, playerSelected],
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Logo />

        <div className={styles["player-selection"]}>
          <Text
            className={styles["player-selection__title"]}
            variant="heading"
            size="extra-small"
            content="Pick player 1's mark"
          />

          <div className={styles["player-selection__switch"]}>
            <div
              className={[
                styles["player-selection__switch__button"],
                playerSelected === "x" && styles["player-selection__switch__button--active"],
              ].join(" ")}
              onClick={() => setPlayedSelected("x")}
            >
              <XIcon color={playerSelected === "x" ? colors.darkNavy : colors.silver} />
            </div>

            <div
              className={[
                styles["player-selection__switch__button"],
                playerSelected === "o" && styles["player-selection__switch__button--active"],
              ].join(" ")}
              onClick={() => setPlayedSelected("o")}
            >
              <OIcon color={playerSelected === "o" ? colors.darkNavy : colors.silver} />
            </div>
          </div>

          <Text className={styles["player-selection__subtitle"]} variant="body" content="Remember: X goes first" />
        </div>

        <div className={styles["mode-selection"]}>
          <Button label="New game (vs cpu)" color="yellow" onClick={() => handleOnStartNewGame("pve")} />
          <Button label="New game (vs player)" color="blue" onClick={() => handleOnStartNewGame("pvp")} />
        </div>
      </div>
    </main>
  );
}
