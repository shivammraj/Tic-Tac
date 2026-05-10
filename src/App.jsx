import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import GameBoard from './components/GameBoard';
import History from './components/History';
import Leaderboard from './components/Leaderboard';
import Settings from './components/Settings';
import About from './components/About';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<GameBoard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<History />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <div className="w-full text-center py-md opacity-50 font-body-sm mt-auto z-10">
        Design by Shivam Mavi
      </div>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] flex justify-around items-center h-20 px-lg bg-[#0D0D0D]/80 backdrop-blur-lg border-t border-white/10 z-50">
        <div 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center transition-transform duration-100 cursor-pointer ${location.pathname === '/' ? 'text-primary scale-110' : 'text-on-surface-variant opacity-50 active:scale-95 hover:bg-surface-container-high p-sm rounded'}`}
        >
          <span className="material-symbols-outlined" style={location.pathname === '/' ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
          {location.pathname === '/' && <span className="font-label-caps text-label-caps mt-xs">home</span>}
        </div>
        
        <div 
          onClick={() => navigate('/play')}
          className={`flex flex-col items-center justify-center transition-transform duration-100 cursor-pointer ${location.pathname === '/play' ? 'text-primary scale-110' : 'text-on-surface-variant opacity-50 active:scale-95 hover:bg-surface-container-high p-sm rounded'}`}
        >
          <span className="material-symbols-outlined" style={location.pathname === '/play' ? { fontVariationSettings: "'FILL' 1" } : {}}>sports_esports</span>
          {location.pathname === '/play' && <span className="font-label-caps text-label-caps mt-xs">play</span>}
        </div>

        <div 
          onClick={() => navigate('/history')}
          className={`flex flex-col items-center justify-center transition-transform duration-100 cursor-pointer ${location.pathname === '/history' ? 'text-primary scale-110' : 'text-on-surface-variant opacity-50 active:scale-95 hover:bg-surface-container-high p-sm rounded'}`}
        >
          <span className="material-symbols-outlined" style={location.pathname === '/history' ? { fontVariationSettings: "'FILL' 1" } : {}}>history</span>
          {location.pathname === '/history' && <span className="font-label-caps text-label-caps mt-xs">history</span>}
        </div>
      </nav>
      {/* Spacer for fixed BottomNavBar */}
      <div className="h-20 w-full"></div>
    </>
  );
}

export default App;
