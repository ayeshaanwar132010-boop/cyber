import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameCanvas from './components/GameCanvas';
import HUD from './components/HUD';
import PauseOverlay from './components/PauseOverlay';
import GameOverOverlay from './components/GameOverOverlay';

export default function App() {
  const [gameState, setGameState] = useState('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const startGame = () => {
    setScore(0);
    setGameState('PLAYING');
  };

  const handleGameOver = (finalScore) => {
    setScore(finalScore);
    if (finalScore > highScore) setHighScore(finalScore);
    setGameState('GAMEOVER');
  };

  return (
    <div className="game-container">
      {gameState === 'START' && (
        <StartScreen onStart={startGame} highScore={highScore} />
      )}
      
      {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
        <>
          <HUD 
            score={score} 
            highScore={highScore} 
            onPause={() => setGameState('PAUSED')} 
          />
          <GameCanvas 
            isPaused={gameState === 'PAUSED'} 
            onGameOver={handleGameOver} 
            setScore={setScore} 
          />
        </>
      )}

      {gameState === 'PAUSED' && (
        <PauseOverlay 
          onResume={() => setGameState('PLAYING')} 
          onRestart={startGame} 
        />
      )}

      {gameState === 'GAMEOVER' && (
        <GameOverOverlay 
          score={score} 
          highScore={highScore} 
          onRestart={startGame} 
        />
      )}
    </div>
  );
}
