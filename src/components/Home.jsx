import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [showAiOptions, setShowAiOptions] = useState(false);

  return (
    <div className="flex-grow flex flex-col items-center overflow-x-hidden">
      {/* TopAppBar */}
      <header className="flex justify-between items-center px-container-padding h-16 w-full max-w-[480px] mx-auto border-b border-white/10 bg-[#0D0D0D]/80 backdrop-blur-lg sticky top-0 z-50">
        <div 
          onClick={() => navigate('/about')}
          className="flex items-center justify-center h-10 w-10 transition-colors duration-150 ease-in-out hover:bg-white/5 text-on-surface-variant cursor-pointer rounded-full"
        >
          <span className="material-symbols-outlined">grid_view</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter">TICTAC</h1>
        <div
          onClick={() => navigate('/settings')}
          className="flex items-center justify-center h-10 w-10 transition-colors duration-150 ease-in-out hover:bg-white/5 text-on-surface-variant cursor-pointer rounded-full"
        >
          <span className="material-symbols-outlined">settings</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-[480px] px-container-padding py-xl gap-xl custom-grid-bg">
        {/* Hero Branding Section */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full"></div>
          <h2 className="font-display-xl text-[64px] tracking-[4px] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-sm">TICTAC</h2>
          <p className="font-body-lg text-body-lg text-on-surface opacity-60 tracking-widest uppercase text-xs">The classic game, reimagined</p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-md mt-md">
          <button
            onClick={() => navigate('/play?mode=friend')}
            className="w-full py-md bg-gradient-to-r from-primary to-[#ff8a80] text-[#0D0D0D] rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-sm active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(255,179,174,0.3)] hover:shadow-[0_0_30px_rgba(255,179,174,0.5)]"
          >
            <span className="material-symbols-outlined">group</span>
            Play vs Friend
          </button>
          
          <div className="flex flex-col gap-sm">
            <button
              onClick={() => setShowAiOptions(!showAiOptions)}
              className="w-full py-md bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-white/10"
            >
              <span className="material-symbols-outlined">smart_toy</span>
              Play vs AI
              <span className={`material-symbols-outlined transition-transform ${showAiOptions ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
            
            {/* AI Difficulty Options */}
            {showAiOptions && (
              <div className="flex flex-col gap-xs animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="grid grid-cols-3 gap-xs bg-white/5 p-xs rounded-xl border border-white/5">
                  <button 
                    onClick={() => navigate('/play?mode=ai&difficulty=basic')}
                    className="py-sm bg-[#63d09e]/20 text-[#63d09e] rounded-lg font-headline-md text-sm border border-[#63d09e]/30 hover:bg-[#63d09e]/30 transition-colors"
                  >
                    Basic
                  </button>
                  <button 
                    onClick={() => navigate('/play?mode=ai&difficulty=mid')}
                    className="py-sm bg-[#EF9F27]/20 text-[#EF9F27] rounded-lg font-headline-md text-sm border border-[#EF9F27]/30 hover:bg-[#EF9F27]/30 transition-colors"
                  >
                    Mid
                  </button>
                  <button 
                    onClick={() => navigate('/play?mode=ai&difficulty=pro')}
                    className="py-sm bg-[#E24B4A]/20 text-[#E24B4A] rounded-lg font-headline-md text-sm border border-[#E24B4A]/30 hover:bg-[#E24B4A]/30 transition-colors"
                  >
                    Pro
                  </button>
                </div>
                <p className="text-center font-body-sm text-xs text-white/40 mt-xs">
                  Choose your opponent's skill level
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Daily Tip Card */}
        <div className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-lg flex flex-col gap-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 blur-3xl rounded-full"></div>
          <div className="flex items-center gap-sm text-tertiary relative z-10">
            <span className="material-symbols-outlined">lightbulb</span>
            <span className="font-label-caps text-label-caps tracking-widest">PRO TIP</span>
          </div>
          <p className="font-body-sm text-body-sm text-white/70 leading-relaxed relative z-10">
            Taking the center square on your first move gives you the highest mathematical probability of creating a winning line!
          </p>
        </div>

        {/* Secondary Navigation/Links */}
        <div className="w-full grid grid-cols-2 gap-sm">
          <div
            onClick={() => navigate('/leaderboard')}
            className="flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 p-md rounded-xl gap-sm opacity-80 hover:opacity-100 hover:bg-white/10 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-white">emoji_events</span>
            <span className="font-body-sm text-white tracking-wide">Leaderboard</span>
          </div>
          <div
            onClick={() => alert("Just play the game bro, don't make a profile. 💀")}
            className="flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 p-md rounded-xl gap-sm opacity-80 hover:opacity-100 hover:bg-white/10 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-white">person</span>
            <span className="font-body-sm text-white tracking-wide">Profile</span>
          </div>
        </div>
      </main>
    </div>
  );
}
