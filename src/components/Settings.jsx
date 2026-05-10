import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playClick } from '../utils/soundPlayer';

export default function Settings() {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(localStorage.getItem('tictac_sound') !== 'false');

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('tictac_sound', newState.toString());
    if (newState) {
      setTimeout(() => playClick(true), 50); // Play a test sound when turning on
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center overflow-x-hidden font-body-lg">
      {/* TopAppBar */}
      <header className="flex justify-between items-center px-container-padding h-16 w-full max-w-[480px] mx-auto border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-lg sticky top-0 z-50">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center justify-center h-10 w-10 transition-colors duration-150 ease-in-out hover:bg-white/5 text-on-surface-variant cursor-pointer rounded-full"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter">SETTINGS</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[480px] px-container-padding py-md pb-xl relative">
        <div className="absolute top-20 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -z-10"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-secondary/10 blur-3xl rounded-full -z-10"></div>
        
        {/* Strategy Section */}
        <div className="mt-md">
          <div className="flex items-center gap-sm mb-sm pl-xs">
            <span className="material-symbols-outlined text-tertiary">psychology</span>
            <h2 className="font-display-lg text-[24px] tracking-wide text-white">HOW TO ALWAYS WIN (OR DRAW)</h2>
          </div>
          
          <div className="flex flex-col gap-md">
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-md">
              <h3 className="font-headline-md text-primary mb-xs">1. Play the Center</h3>
              <p className="font-body-sm text-white/70 leading-relaxed">
                If you go first, always place your X in the center square. It gives you 4 possible ways to win (two diagonals, one vertical, one horizontal).
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-md">
              <h3 className="font-headline-md text-secondary mb-xs">2. The Corner Trap</h3>
              <p className="font-body-sm text-white/70 leading-relaxed">
                If the center is taken by your opponent, take a corner. Taking a corner gives you multiple intersecting paths, forcing your opponent to play defensively.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-md">
              <h3 className="font-headline-md text-tertiary mb-xs">3. Block the Fork</h3>
              <p className="font-body-sm text-white/70 leading-relaxed">
                A fork is when a player creates two distinct ways to win on their next turn. If your opponent takes opposite corners, play an EDGE (not a corner) to force them to block you, ruining their fork setup.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-md">
              <h3 className="font-headline-md text-white mb-xs">4. Perfect Play = Draw</h3>
              <p className="font-body-sm text-white/70 leading-relaxed">
                Tic-Tac-Toe is a "solved" game. If both players make the mathematically best moves, the game will always end in a draw. Let your opponent make the first mistake!
              </p>
            </div>

          </div>
        </div>

        {/* General Settings */}
        <div className="mt-xl border-t border-white/10 pt-lg">
          <h2 className="font-display-lg text-[20px] tracking-wide text-white mb-md pl-xs">PREFERENCES</h2>
          
          <div className="flex flex-col gap-sm">
            <div onClick={toggleSound} className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-md cursor-pointer hover:bg-white/10 transition-colors">
              <span className="font-body-lg text-white">Sound Effects</span>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${soundEnabled ? 'bg-primary shadow-[0_0_10px_rgba(255,179,174,0.3)]' : 'bg-white/20'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${soundEnabled ? 'right-1 bg-[#0D0D0D]' : 'left-1 bg-white/50'}`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-md opacity-50">
              <span className="font-body-lg text-white">Haptic Feedback</span>
              <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-not-allowed">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
