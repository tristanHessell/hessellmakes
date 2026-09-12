import { HashRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Home } from "./pages/Home";
import { Gallery } from "./pages/Gallery";
import { Catalog } from "./pages/Catalog";
import { Contact } from "./pages/Contact";
import { ThemeProvider } from "./theme/ThemeContext";

// HashRouter is used (rather than BrowserRouter) so the built site can be
// hosted on a plain CDN/static host without configuring server-side URL
// rewrites — every route resolves to the same index.html and React Router
// reads the route from the URL hash.
function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
