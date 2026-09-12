// Shared page chrome (header, nav, footer) rendered around every route via
// React Router's <Outlet />.
import { Outlet } from "react-router-dom";
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Logo size={32} />
          <span className={styles.wordmark}>
            <strong>HESSELL</strong>MAKES
          </span>
        </div>
        <NavMenu />
      </header>

      <main>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} HessellMakes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
