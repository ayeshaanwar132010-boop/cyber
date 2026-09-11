import React from 'react';

export default function HUD({ score, highScore, onPause }) {
  return (
    <div className="hud">
      <div>Score: {score}</div>
      <div>High Score: {highScore}</div>
      <button className="btn-small" onClick={onPause}>Pause</button>
    </div>
  );
}