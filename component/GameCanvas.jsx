import React, { useEffect, useRef } from 'react';

export default function GameCanvas({ isPaused, onGameOver, setScore }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let player = { x: 50, y: 180, width: 30, height: 30, dy: 0, gravity: 0.5, jump: -9 };
    let obstacles = [];
    let frame = 0;
    let currentScore = 0;

    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        player.dy = player.jump;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const update = () => {
      if (isPaused) return;

      frame++;
      player.dy += player.gravity;
      player.y += player.dy;

      if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
      }
      if (player.y < 0) player.y = 0;

      if (frame % 90 === 0) {
        const gap = 130;
        const topHeight = Math.floor(Math.random() * (canvas.height - gap - 40)) + 20;
        obstacles.push({
          x: canvas.width,
          topHeight,
          bottomY: topHeight + gap,
          width: 40,
          passed: false
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#6366f1';
      ctx.fillRect(player.x, player.y, player.width, player.height);

      for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= 3;

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(obs.x, 0, obs.width, obs.topHeight);
        ctx.fillRect(obs.x, obs.bottomY, obs.width, canvas.height - obs.bottomY);

        if (!obs.passed && obs.x < player.x) {
          obs.passed = true;
          currentScore += 1;
          setScore(currentScore);
        }

        if (
          player.x < obs.x + obs.width &&
          player.x + player.width > obs.x &&
          (player.y < obs.topHeight || player.y + player.height > obs.bottomY)
        ) {
          onGameOver(currentScore);
          return;
        }

        if (obs.x + obs.width < 0) {
          obstacles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return <canvas ref={canvasRef} width={600} height={400} className="game-canvas" />;
}