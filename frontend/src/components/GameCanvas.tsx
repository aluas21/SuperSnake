import React, { useRef, useEffect } from 'react';

export interface GameCanvasProps {
  snake: [number, number][];
  opponentSnake?: [number, number][];
  walls: [number, number][];
  apples: [number, number][];
  coin: [number, number] | undefined;
  cash: [number, number][] | undefined;
  cellSize: number;
  canvasWidth: number;
  canvasHeight: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  snake,
  opponentSnake,
  walls,
  apples,
  coin,
  cash,
  cellSize,
  canvasWidth,
  canvasHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // chessboard pattern
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    for (let x = 0; x < canvasWidth; x += 2) {
      for (let y = 0; y < canvasHeight; y += 2) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
    for (let x = 1; x < canvasWidth; x += 2) {
      for (let y = 1; y < canvasHeight; y += 2) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    // draw walls if set
    if (walls) {
      ctx.fillStyle = 'black';
      walls.forEach(([x, y]) => {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      });
    }

    // draw snake body
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'lightgreen';
    snake.forEach(([x, y]) => {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });

    // draw snake head
    ctx.fillStyle = 'green';
    const head = snake[0];
    if (head) {
      ctx.fillRect(head[0] * cellSize, head[1] * cellSize, cellSize, cellSize);
      ctx.strokeRect(head[0] * cellSize, head[1] * cellSize, cellSize, cellSize);
    }

    // draw opponent snake if set
    if (opponentSnake && opponentSnake.length > 0) {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.fillStyle = 'lightblue';
      opponentSnake.forEach(([x, y]) => {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      });

      ctx.fillStyle = 'blue';
      const oppHead = opponentSnake[0];
      if (oppHead) {
        ctx.fillRect(oppHead[0] * cellSize, oppHead[1] * cellSize, cellSize, cellSize);
        ctx.strokeRect(
          oppHead[0] * cellSize,
          oppHead[1] * cellSize,
          cellSize,
          cellSize
        );
      }
    }

    // draw apples
    for (let i = 0; i < apples.length; i++) {
      const apple = apples[i];
      if (!apple) continue;
      const centerX = apple[0] * cellSize + cellSize / 2;
      const centerY = apple[1] * cellSize + cellSize / 2;
      const radius = cellSize / 2 - 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.max(1, radius), 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.strokeStyle = 'darkred';
      ctx.stroke();
    }

    // draw coin if set
    if (coin) {
      const coinCenterX = coin[0] * cellSize + cellSize / 2;
      const coinCenterY = coin[1] * cellSize + cellSize / 2;
      const coinRadius = cellSize / 2 - 2;

      ctx.beginPath();
      ctx.arc(coinCenterX, coinCenterY, Math.max(1, coinRadius), 0, 2 * Math.PI);
      ctx.fillStyle = 'gold';
      ctx.fill();
      ctx.strokeStyle = 'darkgoldenrod';
      ctx.stroke();
    }

    // draw cash if set
    if (cash) {
      cash.forEach(([x, y]) => {
        const centerX = x * cellSize + cellSize / 2;
        const centerY = y * cellSize + cellSize / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - cellSize / 2 + 2);
        ctx.lineTo(centerX + cellSize / 2 - 2, centerY);
        ctx.lineTo(centerX, centerY + cellSize / 2 - 2);
        ctx.lineTo(centerX - cellSize / 2 + 2, centerY);
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.strokeStyle = 'darkblue';
        ctx.stroke();
      });
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [snake, opponentSnake, apples, coin, cash, cellSize, canvasWidth, canvasHeight]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="border-2 border-slate-700 rounded-lg shadow-lg bg-gray-200"
    />
  );
};

export default GameCanvas;
