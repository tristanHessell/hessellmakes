// Shared page chrome (header, nav, footer) rendered around every route via
// React Router's <Outlet />.
import { Link, Outlet } from "react-router-dom";
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import { SocialLinks } from "./SocialLinks";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>

      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          <Logo size={32} decorative className={styles.logo} />
          <span className={styles.wordmark}>
            <strong>HESSELL</strong>MAKES
          </span>
        </Link>
        <NavMenu />
      </header>

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <SocialLinks />
        <p>
          &copy; {new Date().getFullYear()} HessellMakes. All rights reserved.
        </p>
        <p className={styles.credit}>Made with ❤️ by my favourite brother</p>
      </footer>
    </div>
  );
}
