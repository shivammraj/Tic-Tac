import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addMatch } from '../utils/gameStore';
import { playClick, playWin, playDraw } from '../utils/soundPlayer';

export default function GameBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode') || 'friend';
  const difficulty = queryParams.get('difficulty') || 'basic';

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Game scores state
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    if (!squares.includes(null)) {
      return { winner: 'Draw' };
    }
    return null;
  };

  const result = calculateWinner(board);
  const isGameOver = result !== null;

  const handleGameEnd = (checkResult) => {
    if (checkResult.winner === 'X') {
      setScores(s => ({ ...s, x: s.x + 1 }));
    } else if (checkResult.winner === 'O') {
      setScores(s => ({ ...s, o: s.o + 1 }));
    } else if (checkResult.winner === 'Draw') {
      setScores(s => ({ ...s, draws: s.draws + 1 }));
    }
    
    if (checkResult.winner === 'Draw') playDraw();
    else playWin();

    let resultText = checkResult.winner === 'Draw' ? 'DRAW' : `${checkResult.winner} WINS`;
    addMatch({ mode: mode === 'ai' ? 'vs AI' : 'vs Friend', result: resultText, myRole: 'X', winner: checkResult.winner });
  };

  // --- AI Logic Helpers ---
  const getEmptyIndices = (squares) => squares.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
  
  const getRandomMove = (emptyIndices) => emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  const findWinningMove = (squares, player) => {
    const emptyIndices = getEmptyIndices(squares);
    for (let i of emptyIndices) {
      const testBoard = [...squares];
      testBoard[i] = player;
      const res = calculateWinner(testBoard);
      if (res && res.winner === player) return i;
    }
    return null;
  };

  const minimax = (squares, depth, isMaximizing, alpha, beta) => {
    const res = calculateWinner(squares);
    if (res) {
      if (res.winner === 'O') return 10 - depth;
      if (res.winner === 'X') return depth - 10;
      if (res.winner === 'Draw') return 0;
    }

    const emptyIndices = getEmptyIndices(squares);

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i of emptyIndices) {
        squares[i] = 'O';
        let score = minimax(squares, depth + 1, false, alpha, beta);
        squares[i] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i of emptyIndices) {
        squares[i] = 'X';
        let score = minimax(squares, depth + 1, true, alpha, beta);
        squares[i] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
      return bestScore;
    }
  };

  const getProMove = (squares) => {
    let bestScore = -Infinity;
    let move = null;
    const emptyIndices = getEmptyIndices(squares);
    
    for (let i of emptyIndices) {
      squares[i] = 'O';
      let score = minimax(squares, 0, false, -Infinity, Infinity);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
    return move;
  };

  const getMidMove = (squares) => {
    const emptyIndices = getEmptyIndices(squares);
    
    // 1. Win if possible
    const winMove = findWinningMove(squares, 'O');
    if (winMove !== null) return winMove;
    
    // 2. Block player
    const blockMove = findWinningMove(squares, 'X');
    if (blockMove !== null) return blockMove;
    
    // 3. Take center
    if (squares[4] === null) return 4;
    
    // 4. Take corner (60% chance)
    if (Math.random() < 0.6) {
      const corners = [0, 2, 6, 8].filter(idx => squares[idx] === null);
      if (corners.length > 0) return getRandomMove(corners);
    }
    
    // 5. Random
    return getRandomMove(emptyIndices);
  };

  const getBasicMove = (squares) => {
    const emptyIndices = getEmptyIndices(squares);
    // 30% chance to block
    if (Math.random() < 0.3) {
      const blockMove = findWinningMove(squares, 'X');
      if (blockMove !== null) return blockMove;
    }
    return getRandomMove(emptyIndices);
  };

  // AI Move logic
  useEffect(() => {
    if (mode === 'ai' && !xIsNext && !isGameOver) {
      const delay = difficulty === 'basic' ? 300 : difficulty === 'mid' ? 500 : 700;
      
      const timer = setTimeout(() => {
        const emptyIndices = getEmptyIndices(board);
        if (emptyIndices.length > 0) {
          let moveIdx = null;
          
          if (difficulty === 'pro') moveIdx = getProMove([...board]);
          else if (difficulty === 'mid') moveIdx = getMidMove([...board]);
          else moveIdx = getBasicMove([...board]);

          const newBoard = [...board];
          newBoard[moveIdx] = 'O';
          setBoard(newBoard);
          setXIsNext(true);
          playClick(false);

          const checkResult = calculateWinner(newBoard);
          if (checkResult) handleGameEnd(checkResult);
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, board, isGameOver, mode, difficulty]);

  const handleClick = (i) => {
    if (board[i] || isGameOver) return;
    if (mode === 'ai' && !xIsNext) return; // Prevent clicking during AI's turn

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    playClick(xIsNext);
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const checkResult = calculateWinner(newBoard);
    if (checkResult) handleGameEnd(checkResult);
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const getTurnText = () => {
    if (xIsNext) return "X's Turn";
    if (mode === 'friend') return "O's Turn";
    return `${difficulty} ai thinking...`;
  };

  return (
    <div className="flex-grow flex flex-col font-body-lg overflow-x-hidden">
      {/* TopAppBar */}
      <header className="bg-[#0D0D0D]/80 backdrop-blur-lg border-b border-white/10 flex justify-between items-center px-container-padding h-16 w-full max-w-[480px] mx-auto sticky top-0 z-50">
        <button onClick={() => navigate('/')} className="text-on-surface-variant hover:bg-white/5 transition-colors duration-150 ease-in-out p-2 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-display-lg text-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tighter">TICTAC</h1>
        <button onClick={() => navigate('/settings')} className="text-on-surface-variant hover:bg-white/5 transition-colors duration-150 ease-in-out p-2 rounded-full">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="flex-1 w-full max-w-[480px] mx-auto px-container-padding pt-md pb-xl">
        
        {/* AI Difficulty Context (if playing AI) */}
        {mode === 'ai' && (
          <div className="flex items-center justify-center gap-xs mb-sm">
            <span className="material-symbols-outlined text-white/40 text-sm">smart_toy</span>
            <span className="font-body-sm text-xs text-white/40">
              AI Level: {difficulty === 'basic' ? 'Basic — makes mistakes' : difficulty === 'mid' ? 'Mid — plays smart' : 'Pro — unbeatable ☠️'}
            </span>
          </div>
        )}

        {/* Turn Indicator Row */}
        <div className={`flex items-center justify-center gap-sm py-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg ${mode === 'ai' ? 'mb-md' : 'mb-xl'}`}>
          {isGameOver ? (
            <span className="font-label-caps text-label-caps tracking-widest uppercase" style={{ color: result.winner === 'X' ? '#ffb3ae' : result.winner === 'O' ? '#a4c9ff' : '#e5e2dd' }}>
              {result.winner === 'Draw' ? "It's a Draw" : `${result.winner} WINS`}
            </span>
          ) : (
            <>
              <div className={`w-3 h-3 rounded-full ${xIsNext ? 'bg-primary shadow-[0_0_10px_rgba(255,179,174,0.8)]' : 'bg-secondary shadow-[0_0_10px_rgba(164,201,255,0.8)]'}`}></div>
              <span className="font-label-caps text-label-caps text-white/80 tracking-widest uppercase">
                {getTurnText()}
              </span>
            </>
          )}
        </div>

        {/* Game Board Container */}
        <div className="relative w-full aspect-square mb-xl">
          <div className="game-grid h-full">
            {board.map((cell, i) => {
              const isWinningCell = result && result.line && result.line.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => handleClick(i)}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center aspect-square transition-all cursor-pointer hover:bg-white/10 ${isWinningCell ? (cell === 'X' ? 'shadow-[0_0_20px_rgba(255,179,174,0.5)] border-primary' : 'shadow-[0_0_20px_rgba(164,201,255,0.5)] border-secondary') : ''}`}
                >
                  {cell && (
                    <span className={`font-display-xl text-[72px] leading-none select-none ${cell === 'X' ? 'text-primary drop-shadow-[0_0_15px_rgba(255,179,174,0.8)]' : 'text-secondary drop-shadow-[0_0_15px_rgba(164,201,255,0.8)]'}`}>
                      {cell}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Score Bar */}
        <div className="grid grid-cols-3 gap-md mb-xl">
          <div className="flex flex-col items-center p-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <span className="font-label-caps text-label-caps text-primary mb-xs">PLAYER X</span>
            <span className="font-headline-md text-headline-md text-white">{String(scores.x).padStart(2, '0')}</span>
          </div>
          <div className="flex flex-col items-center p-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <span className="font-label-caps text-label-caps text-white/50 mb-xs">DRAWS</span>
            <span className="font-headline-md text-headline-md text-white">{String(scores.draws).padStart(2, '0')}</span>
          </div>
          <div className="flex flex-col items-center p-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <span className="font-label-caps text-label-caps text-secondary mb-xs">PLAYER O</span>
            <span className="font-headline-md text-headline-md text-white">{String(scores.o).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Action Button */}
        {isGameOver && (
          <button
            onClick={startNewGame}
            className="w-full bg-gradient-to-r from-primary to-secondary text-[#0D0D0D] py-md rounded-xl font-headline-md text-headline-md uppercase tracking-widest active:scale-95 transition-transform duration-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Play Again
          </button>
        )}
      </main>

      {/* Win Result Card Overlay */}
      {isGameOver && result.winner !== 'Draw' && (
        <div className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-md z-[60] flex items-center justify-center flex-col animate-in fade-in duration-300">
          <div className="relative">
            <div className={`absolute inset-0 blur-[100px] -z-10 rounded-full ${result.winner === 'X' ? 'bg-primary/40' : 'bg-secondary/40'}`}></div>
            <h1 className={`font-display-xl text-[80px] tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] ${result.winner === 'X' ? 'text-primary' : 'text-secondary'}`}>
              {result.winner} WINS
            </h1>
          </div>
          <button
            onClick={startNewGame}
            className="mt-xl px-xl bg-white/10 backdrop-blur-md border border-white/20 text-white py-md rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-white/20 shadow-lg"
          >
            Play Again
          </button>
        </div>
      )}
      {isGameOver && result.winner === 'Draw' && (
        <div className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-md z-[60] flex items-center justify-center flex-col animate-in fade-in duration-300">
          <h1 className="font-display-xl text-[80px] tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            DRAW
          </h1>
          <button
            onClick={startNewGame}
            className="mt-xl px-xl bg-white/10 backdrop-blur-md border border-white/20 text-white py-md rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-white/20 shadow-lg"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
