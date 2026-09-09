import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import StoriesPage from './pages/StoriesPage.jsx';
import MusicPage from './pages/MusicPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import LorePage from './pages/LorePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <Routes>
              <Route path="stories" element={<StoriesPage />} />
              <Route path="music" element={<MusicPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="lore" element={<LorePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </>
        }
      />
    </Routes>
  );
}

export default App;