import React, { useRef, useEffect } from 'react';

interface GameCanvasProps {
  snake: [number, number][];
  apple: [number, number];
  coin: [number, number] | undefined;
  cash: [number, number][] | undefined;
  cellSize: number;
  canvasWidth: number;
  canvasHeight: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  snake,
  apple,
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
    ctx.fillRect(head[0] * cellSize, head[1] * cellSize, cellSize, cellSize);
    ctx.strokeRect(head[0] * cellSize, head[1] * cellSize, cellSize, cellSize);

    // draw apple
    const centerX = apple[0] * cellSize + cellSize / 2;
    const centerY = apple[1] * cellSize + cellSize / 2;
    const radius = cellSize / 2 - 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'darkred';
    ctx.stroke();

    // draw coin if coin is set
    if (coin) {
      const coinCenterX = coin[0] * cellSize + cellSize / 2;
      const coinCenterY = coin[1] * cellSize + cellSize / 2;
      const coinRadius = cellSize / 2 - 2;

      ctx.beginPath();
      ctx.arc(coinCenterX, coinCenterY, coinRadius, 0, 2 * Math.PI);
      ctx.fillStyle = 'gold';
      ctx.fill();
      ctx.strokeStyle = 'darkgoldenrod';
      ctx.stroke();
    }

    // draw cash if cash is set
    if (cash) {
      cash.forEach(([x, y]) => {
        // diamond shape for cash
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

  // draw the canvas
  useEffect(() => {
    drawCanvas();
  }, [snake, apple, coin, cash]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ border: '1px solid black', backgroundColor: 'lightgray' }}
    />
  );
};

export default GameCanvas;
