import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ComingSoon } from "./pages/ComingSoon";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";
import { Shop } from "./pages/Shop";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Design } from "./pages/Design";
import { ThemeProvider } from "./theme/ThemeContext";

// BrowserRouter requires the static host to serve index.html for every
// path (e.g. /gallery, /contact), not just "/" — see README's Pages &
// navigation section for the rewrite rule this needs on a CDN/static host.
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* TEMPORARY: "/" shows a Coming Soon page, and the rest of the
              site sits behind "/site" instead of at the site root. To
              remove the Coming Soon page and restore the site at "/":
              1. Delete this Route line.
              2. Change the Route path below from "/site" back to "/".
              3. Delete src/pages/ComingSoon.tsx and
                 src/pages/ComingSoon.module.css.
              4. Update public/sitemap.xml to match — see the SEO section
                 in README.md.
              AppLayout, NavMenu, and the in-app links all use route-relative
              paths, so they need no change either way. */}
          <Route path="/" element={<ComingSoon />} />
          <Route path="/site" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="design" element={<Design />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
