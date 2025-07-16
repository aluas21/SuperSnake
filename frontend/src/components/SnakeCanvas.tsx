import React from 'react';
import { useEffect, useRef, useState } from 'react';

const CELL_SIZE = 20;
const ROWS = 30;
const COLS = 30;
const CANVAS_WIDTH = COLS * CELL_SIZE;
const CANVAS_HEIGHT = ROWS * CELL_SIZE;

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

const SnakeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<[number, number][]>(createSnake(3));
  const [gameOver, setGameOver] = useState(false);

  const directionRef = useRef<[number, number]>([0, 1]); // moving right by default
  const lastTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  const [apple, setApple] = useState<[number, number]>(createApple(snake));

  const resetGame = () => {
    setSnake(createSnake(INITIAL_SNAKE_LENGTH));
    directionRef.current = [0, 1];
    setApple(createApple([]));
    lastTimeRef.current = null;
    setGameOver(false);
  };

  // handle key events (avoid backward movement)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
          if (directionRef.current[0] === 0) directionRef.current = [-1, 0];
          break;
        case 's':
          if (directionRef.current[0] === 0) directionRef.current = [1, 0];
          break;
        case 'a':
          if (directionRef.current[1] === 0) directionRef.current = [0, -1];
          break;
        case 'd':
          if (directionRef.current[1] === 0) directionRef.current = [0, 1];
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [directionRef]);

  // game loop
  useEffect(() => {
    const speed = 100; // milliseconds

    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;

      if (delta > speed) {
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
  }, [directionRef]);

  // snake draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'lightgreen';
    snake.forEach(([x, y]) => {
      ctx.fillRect(y * CELL_SIZE, x * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.strokeRect(y * CELL_SIZE, x * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // draw snake head
    ctx.fillStyle = 'green';
    const head = snake[0];
    ctx.fillRect(
      head[1] * CELL_SIZE,
      head[0] * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    ctx.strokeRect(
      head[1] * CELL_SIZE,
      head[0] * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // draw apple
    const centerX = apple[1] * CELL_SIZE + CELL_SIZE / 2;
    const centerY = apple[0] * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 2 - 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'darkred';
    ctx.stroke();
  }, [snake, apple]);

  // check for body collisions
  useEffect(() => {
    const head = snake[0];
    const body = snake.slice(1);
    if (body.some(([x, y]) => x === head[0] && y === head[1])) {
      setGameOver(true);
      alert('Game Over! You collided with yourself.');
      resetGame();
    }
  }, [snake, gameOver]);

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
    }
  }, [snake, apple]);

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
