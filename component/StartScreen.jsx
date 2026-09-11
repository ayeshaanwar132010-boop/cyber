import React from 'react';

export default function StartScreen({ onStart, highScore }) {
  return (
    <div className="overlay">
      <h1>Cyber Runner</h1>
      <p>Press <strong>[Spacebar]</strong> or <strong>[Up Arrow]</strong> to jump over red barriers.</p>
      {highScore > 0 && <p className="high-score">High Score: {highScore}</p>}
      <button className="btn" onClick={onStart}>Start Game</button>
    </div>
  );
}