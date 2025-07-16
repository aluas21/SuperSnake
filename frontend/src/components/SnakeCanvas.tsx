import React from 'react';
import { useEffect, useRef, useState } from 'react';

const CELL_SIZE = 20;
const ROWS = 30;
const COLS = 30;
const CANVAS_WIDTH = COLS * CELL_SIZE;
const CANVAS_HEIGHT = ROWS * CELL_SIZE;
const INITIAL_SNAKE_LENGTH = 3;
const SPEED = 100; // milliseconds

const createSnake = (length: number): [number, number][] => {
  return Array.from({ length }, (_, i) => [10, 10 - i] as [number, number]);
};

const createApple = (snake: [number, number][]): [number, number] => {
  let apple: [number, number];
  do {
    apple = [
      Math.floor(Math.random() * ROWS),
      Math.floor(Math.random() * COLS),
    ];
  } while (snake.some(([x, y]) => x === apple[0] && y === apple[1]));
  return apple;
};

const createCoin = (
  snake: [number, number][],
  apple: [number, number]
): [number, number] => {
  let coin: [number, number];
  do {
    coin = [Math.floor(Math.random() * ROWS), Math.floor(Math.random() * COLS)];
  } while (
    snake.some(([x, y]) => x === coin[0] && y === coin[1]) ||
    (apple[0] === coin[0] && apple[1] === coin[1])
  );
  return coin;
};

interface SnakeCanvasProps {
  onAppleEaten: () => void;
  showCoin: boolean;
  onCoinCollected: () => void;
	onGameOver: () => void;
}

const SnakeCanvas: React.FC<SnakeCanvasProps> = ({
  onAppleEaten,
  showCoin,
  onCoinCollected,
	onGameOver,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<[number, number][]>(createSnake(3));
  const [gameOver, setGameOver] = useState(false);

  const directionRef = useRef<[number, number]>([1, 0]); // moving right by default
  const nextDirectionRef = useRef<[number, number]>([1, 0]);

  const lastTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  const [apple, setApple] = useState<[number, number]>(createApple(snake));
  const [setCoin, setSetCoin] = useState<[number, number]>(
    createCoin(snake, apple)
  );

  const resetGame = () => {
		onGameOver();
    setSnake(createSnake(INITIAL_SNAKE_LENGTH));
    directionRef.current = [1, 0];
    nextDirectionRef.current = [1, 0];
    setApple(createApple([]));
    lastTimeRef.current = null;
    setGameOver(false);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // draw snake body
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'lightgreen';
    snake.forEach(([x, y]) => {
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // draw snake head
    ctx.fillStyle = 'green';
    const head = snake[0];
    ctx.fillRect(
      head[0] * CELL_SIZE,
      head[1] * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    ctx.strokeRect(
      head[0] * CELL_SIZE,
      head[1] * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // draw apple
    const centerX = apple[0] * CELL_SIZE + CELL_SIZE / 2;
    const centerY = apple[1] * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 2 - 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'darkred';
    ctx.stroke();

    // draw coin if showCoin is true
    if (showCoin) {
      const coinCenterX = setCoin[0] * CELL_SIZE + CELL_SIZE / 2;
      const coinCenterY = setCoin[1] * CELL_SIZE + CELL_SIZE / 2;
      const coinRadius = CELL_SIZE / 2 - 2;

      ctx.beginPath();
      ctx.arc(coinCenterX, coinCenterY, coinRadius, 0, 2 * Math.PI);
      ctx.fillStyle = 'gold';
      ctx.fill();
      ctx.strokeStyle = 'darkgoldenrod';
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.fillText('$', coinCenterX - 5, coinCenterY + 5);
    }
  };

  // handle key events (avoid backward movement)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const [x, y] = directionRef.current;

      switch (event.key) {
        case 'w':
          if (directionRef.current[1] === 0) nextDirectionRef.current = [0, -1];
          break;
        case 's':
          if (directionRef.current[1] === 0) nextDirectionRef.current = [0, 1];
          break;
        case 'a':
          if (directionRef.current[0] === 0) nextDirectionRef.current = [-1, 0];
          break;
        case 'd':
          if (directionRef.current[0] === 0) nextDirectionRef.current = [1, 0];
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // game loop
  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;

      if (delta > SPEED) {
        directionRef.current = nextDirectionRef.current;

        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const head = newSnake[0];
          const newHead: [number, number] = [
            (head[0] + directionRef.current[0] + ROWS) % ROWS,
            (head[1] + directionRef.current[1] + COLS) % COLS,
          ];
          newSnake.unshift(newHead);
          newSnake.pop();
          return newSnake;
        });
        lastTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  // draw the canvas
  useEffect(() => {
    drawCanvas();
  }, [snake, apple, showCoin, setCoin]);

  // check for body collisions
  useEffect(() => {
    const head = snake[0];
    const body = snake.slice(1);
    if (body.some(([x, y]) => x === head[0] && y === head[1])) {
      setGameOver(true);
      resetGame();
    }
  }, [snake]);

  // check for apple collision
  useEffect(() => {
    const head = snake[0];
    if (head[0] === apple[0] && head[1] === apple[1]) {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        newSnake.push(newSnake[newSnake.length - 1]); // grow the snake
        return newSnake;
      });
      setApple(createApple(snake));
      onAppleEaten();
    }
  }, [snake, apple]);

  // check for coin collision
  useEffect(() => {
    if (!showCoin) return;

    const head = snake[0];
    if (head[0] === setCoin[0] && head[1] === setCoin[1]) {
      onCoinCollected();
      setSetCoin(createCoin(snake, apple));
    }
  }, [snake, showCoin, setCoin, apple, onCoinCollected]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ border: '1px solid black', backgroundColor: 'lightgray' }}
    />
  );
};

export default SnakeCanvas;
