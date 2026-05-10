import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../utils/gameStore';

export default function Leaderboard() {
  const navigate = useNavigate();
  const leaderboardData = getLeaderboard();

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
        <h1 className="font-display-lg text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter">LEADERBOARD</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[480px] px-container-padding py-md pb-xl relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-tertiary/10 blur-3xl rounded-full -z-10"></div>
        
        <div className="flex flex-col gap-sm relative z-10 mt-md">
          {leaderboardData.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-xl opacity-50 mt-xl">
              <span className="material-symbols-outlined text-[64px] mb-md text-white/50">leaderboard</span>
              <p className="font-headline-md text-white">No games played yet</p>
              <p className="font-body-sm text-white/50 text-center mt-xs">Play some matches to see your rank!</p>
            </div>
          ) : (
            leaderboardData.map((player) => (
              <div key={player.rank} className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-md flex items-center gap-md hover:bg-white/10 transition-colors">
                <div className={`flex items-center justify-center min-w-[48px] h-12 rounded-full font-display-lg text-[24px] ${player.rank === 1 ? 'bg-tertiary/20 text-tertiary shadow-[0_0_15px_rgba(255,185,93,0.5)]' : player.rank === 2 ? 'bg-white/10 text-white/80' : 'bg-white/5 text-white/50'}`}>
                  #{player.rank}
                </div>
                
                <div className="flex-grow flex flex-col">
                  <span className="font-headline-md text-headline-md text-white tracking-wide truncate max-w-[150px]">
                    {player.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-white/50">
                    {player.type} • {player.winRate} WR
                  </span>
                </div>

                <div className="flex flex-col items-end justify-center min-w-[50px]">
                  <span className="font-headline-md text-[20px] text-primary drop-shadow-[0_0_5px_rgba(255,179,174,0.5)]">
                    {player.wins}
                  </span>
                  <span className="font-label-caps text-[10px] text-white/40 tracking-widest">
                    WINS
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
