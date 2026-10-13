import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";
import { Shop } from "./pages/Shop";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Design } from "./pages/Design";
import { ThemeProvider } from "./theme/ThemeContext";

function LegacySiteRedirect() {
  const { pathname, search, hash } = useLocation();
  return (
    <Navigate
      to={`${pathname.slice("/site".length) || "/"}${search}${hash}`}
      replace
    />
  );
}

// BrowserRouter requires the static host to serve index.html for every
// path (e.g. /gallery, /contact), not just "/" — see README's Pages &
// navigation section for the rewrite rule this needs on a CDN/static host.
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/site/*" element={<LegacySiteRedirect />} />
          <Route path="/" element={<AppLayout />}>
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
