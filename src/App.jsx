import React,{useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Onboard from './pages/Onboard.jsx';
import NonTiledMapComponent from './components/MapComponent_whole';
import MapPage from "./pages/MapPage.jsx";
import preventZoom from './components/preventZoom.jsx';

function App() {
  preventZoom()
  useEffect(()=>{
    const metaTag = document.querySelector('meta[name="viewport"]');

    if (metaTag) {
      metaTag.setAttribute('content', 'initial-scale=0.8');
    } else {
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = 'viewport';
      newMetaTag.content = 'initial-scale=0.8';
      document.head.appendChild(newMetaTag);
    }
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/simlpe" element={<NonTiledMapComponent />} /> {/* Use NonTiledMapComponent at root path */}
        <Route path ="/map" element={<MapPage />}></Route>
        <Route path="/" element={<Onboard />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;