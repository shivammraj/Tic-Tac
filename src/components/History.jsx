import { useNavigate } from 'react-router-dom';
import { getHistory } from '../utils/gameStore';

export default function History() {
  const navigate = useNavigate();
  const historyData = getHistory();

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
        <h1 className="font-display-lg text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter">HISTORY</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[480px] px-container-padding py-md pb-xl relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 blur-3xl rounded-full -z-10"></div>
        
        <div className="flex flex-col gap-sm relative z-10">
          {historyData.map((match) => (
            <div key={match.id} className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-md flex items-center justify-between hover:bg-white/10 transition-colors">
              <div className="flex flex-col gap-xs">
                <span className={`font-headline-md text-headline-md uppercase tracking-widest ${match.result.includes('X') ? 'text-primary drop-shadow-[0_0_8px_rgba(255,179,174,0.5)]' : match.result.includes('O') ? 'text-secondary drop-shadow-[0_0_8px_rgba(164,201,255,0.5)]' : 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'}`}>
                  {match.result}
                </span>
                <span className="font-body-sm text-body-sm text-white/60">
                  Played {match.mode} as {match.myRole}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-label-caps text-label-caps text-white/40 text-right">
                  {match.date}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-xl flex flex-col items-center justify-center opacity-40">
          <span className="material-symbols-outlined text-[48px] mb-sm text-white/50">history</span>
          <p className="font-body-sm text-body-sm text-center text-white/50">End of match history.</p>
        </div>
      </main>
    </div>
  );
}
