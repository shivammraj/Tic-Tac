import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

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
        <h1 className="font-display-lg text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter">ABOUT</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[480px] px-container-padding py-xl relative flex flex-col items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 blur-3xl rounded-full -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 blur-3xl rounded-full -z-10"></div>
        
        {/* Developer Card */}
        <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-xl flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
          
          <div className="w-24 h-24 bg-[#0D0D0D] border-2 border-white/20 rounded-full flex items-center justify-center mb-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="material-symbols-outlined text-[48px] text-white/80">code</span>
          </div>

          <h2 className="font-display-lg text-[32px] tracking-wide text-white mb-xs">Shivam Mavi</h2>
          <p className="font-label-caps text-label-caps text-tertiary tracking-widest mb-lg">LEAD DEVELOPER & DESIGNER</p>
          
          <p className="font-body-sm text-white/60 leading-relaxed mb-xl px-sm">
            Passionate software engineer focused on building premium, highly-interactive, and stunning web experiences.
          </p>

        </div>
      </main>
    </div>
  );
}
