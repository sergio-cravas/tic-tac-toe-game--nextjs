import { Logo } from "@/ui/Logo/logo";
import { Text } from "@/ui/Text/text";
import { Button } from "@/ui/Button/button";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Logo />
      <Text variant="heading" content="Hola mundo!" />
      <Button label={"Button 1"} />
    </main>
  );
}
