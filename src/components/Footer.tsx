import { SocialLinks } from "./SocialLinks";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <SocialLinks />
      <p>
        &copy; {new Date().getFullYear()} HessellMakes. All rights reserved.
      </p>
      <p className={styles.credit}>Made with ❤️ by my favourite brother</p>
    </footer>
  );
}
