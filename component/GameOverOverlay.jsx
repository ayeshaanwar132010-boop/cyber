import React from 'react';

export default function GameOverOverlay({ score, highScore, onRestart }) {
  return (
    <div className="overlay">
      <h2>Game Over</h2>
      <p>Final Score: {score}</p>
      <p>Best Score: {highScore}</p>
      <button className="btn" onClick={onRestart}>Play Again</button>
    </div>
  );
}