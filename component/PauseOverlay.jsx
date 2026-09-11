import React from 'react';

export default function PauseOverlay({ onResume, onRestart }) {
  return (
    <div className="overlay">
      <h2>Game Paused</h2>
      <div className="btn-group">
        <button className="btn" onClick={onResume}>Resume</button>
        <button className="btn btn-secondary" onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}