const STORAGE_KEY = 'tictac_history';

// Helper to get raw history
export const getHistory = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Add a completed match to history
export const addMatch = (match) => {
  const history = getHistory();
  const newMatch = {
    ...match,
    id: Date.now(),
    date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  };
  history.unshift(newMatch); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return newMatch;
};

// Calculate leaderboard stats from history
export const getLeaderboard = () => {
  const history = getHistory();
  
  // Track stats for "Player 1", "Player 2", and "AI"
  const stats = {
    'Player 1': { name: 'Player 1', wins: 0, matches: 0, type: 'Human' },
    'Player 2': { name: 'Player 2', wins: 0, matches: 0, type: 'Human' },
    'AI': { name: 'The AI Overlord', wins: 0, matches: 0, type: 'AI' }
  };

  history.forEach(match => {
    // Determine who played
    if (match.mode === 'ai') {
      stats['Player 1'].matches += 1;
      stats['AI'].matches += 1;
      
      if (match.winner === 'X') stats['Player 1'].wins += 1;
      if (match.winner === 'O') stats['AI'].wins += 1;
    } else {
      stats['Player 1'].matches += 1;
      stats['Player 2'].matches += 1;
      
      if (match.winner === 'X') stats['Player 1'].wins += 1;
      if (match.winner === 'O') stats['Player 2'].wins += 1;
    }
  });

  // Calculate win rates and format array
  const leaderboard = Object.values(stats)
    .filter(player => player.matches > 0) // Only show players who have played
    .map(player => ({
      ...player,
      winRate: Math.round((player.wins / player.matches) * 100) + '%'
    }))
    .sort((a, b) => b.wins - a.wins); // Sort by wins descending

  // Assign ranks
  return leaderboard.map((player, idx) => ({ ...player, rank: idx + 1 }));
};
