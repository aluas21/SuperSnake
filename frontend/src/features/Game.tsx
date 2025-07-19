import React, { useState, useEffect, useRef } from 'react';
import GameCanvas from '../components/GameCanvas';

const CELL_SIZE = 15;
const ROWS = 30;
const COLS = 30;
const CANVAS_WIDTH = COLS * CELL_SIZE;
const CANVAS_HEIGHT = ROWS * CELL_SIZE;
const INITIAL_SNAKE_LENGTH = 3;
const SPEED = 100; // milliseconds
const COIN_TIMEOUT = 3000; // 3 seconds
const CASH_TIMEOUT = 3000; // 3 seconds
const CASH_CHANCE = 0.2; // 20% chance to spawn cash

const createSnake = (length: number): [number, number][] => {
  return Array.from({ length }, (_, i) => [10, 10 - i] as [number, number]);
};

const createApple = (forbidden: [number, number][]): [number, number] => {
  let apple: [number, number];
  do {
    apple = [
      Math.floor(Math.random() * ROWS),
      Math.floor(Math.random() * COLS),
    ];
  } while (forbidden.some(([x, y]) => x === apple[0] && y === apple[1]));
  return apple;
};

const createCoin = (forbidden: [number, number][]): [number, number] => {
  let coin: [number, number];
  do {
    coin = [Math.floor(Math.random() * ROWS), Math.floor(Math.random() * COLS)];
  } while (forbidden.some(([x, y]) => x === coin[0] && y === coin[1]));
  return coin;
};

const createCash = (forbidden: [number, number][]): [number, number][] => {
  let cash: [number, number][];
  do {
    const x = Math.floor(Math.random() * (ROWS - 1));
    const y = Math.floor(Math.random() * (COLS - 1));
    cash = [
      [x, y],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
    ];
  } while (
    cash.some(
      ([cx, cy]) =>
        cx < 0 ||
        cy < 0 ||
        cx >= ROWS ||
        cy >= COLS ||
        forbidden.some(([fx, fy]) => fx === cx && fy === cy)
    )
  );
  return cash;
};

const Game: React.FC = () => {
  const [snake, setSnake] = useState<[number, number][]>(
    createSnake(INITIAL_SNAKE_LENGTH)
  );

  const directionRef = useRef<[number, number]>([1, 0]); // moving right by default
  const nextDirectionRef = useRef<[number, number]>([1, 0]);

  const lastTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  const [apple, setApple] = useState<[number, number]>(createApple(snake));
  const [coin, setCoin] = useState<[number, number]>();
  const [cash, setCash] = useState<[number, number][]>();

  const [applesEaten, setApplesEaten] = useState(0);
  const [coinsEaten, setCoinsEaten] = useState(0);
  const [cashEaten, setCashEaten] = useState(0);

  const [coinTimer, setCoinTimer] = useState(0);
  const [cashTimer, setCashTimer] = useState(0);

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

  // handle key events (avoid backward movement)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

  const onAppleEaten = () => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      newSnake.push(newSnake[newSnake.length - 1]); // grow the snake
      return newSnake;
    });

    setApple(createApple(snake));
    const newCount = applesEaten + 1;
    setApplesEaten(newCount);

    if (newCount % 5 === 0 && !coin && !cash) {
      if (Math.random() < CASH_CHANCE) {
        setCash(createCash([...snake, apple]));
        setCashTimer(CASH_TIMEOUT);
      } else {
        setCoin(createCoin([...snake, apple]));
        setCoinTimer(COIN_TIMEOUT);
      }
    }
  };

  // check for body collisions
  useEffect(() => {
    const head = snake[0];
    const body = snake.slice(1);
    if (body.some(([x, y]) => x === head[0] && y === head[1])) {
      resetGame();
    }
  }, [snake]);

  // check for apple collision
  useEffect(() => {
    const head = snake[0];
    if (head[0] === apple[0] && head[1] === apple[1]) {
      onAppleEaten();
    }
  }, [snake, apple]);

  // check for coin collision
  useEffect(() => {
    if (!coin) return;
    const head = snake[0];
    if (head[0] === coin[0] && head[1] === coin[1]) {
      setCoin(undefined);
      setCoinsEaten((prev) => prev + 1);
    }
  }, [snake, coin]);

  // check for cash collision
  useEffect(() => {
    if (!cash) return;
    const head = snake[0];
    if (cash.some(([x, y]) => x === head[0] && y === head[1])) {
      setCash(undefined);
      setCashEaten((prev) => prev + 1);
    }
  }, [snake, cash]);

  // coin countdown
  useEffect(() => {
    if (!coin) return;
    const timer = setInterval(() => {
      setCoinTimer((prev) => {
        if (prev <= 1000) {
          setCoin(undefined);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [coin]);

  // cash countdown
  useEffect(() => {
    if (!cash) return;
    const timer = setInterval(() => {
      setCashTimer((prev) => {
        if (prev <= 1000) {
          setCash(undefined);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cash]);

  const resetGame = () => {
    alert(
      'Game Over! You ate ' +
        applesEaten +
        ' apples, ' +
        coinsEaten +
        ' coins and ' +
        cashEaten +
        ' cash.'
    );
    setApplesEaten(0);
    setCoinsEaten(0);
    setCashEaten(0);
    setCoinTimer(0);
    setCashTimer(0);
    setSnake(createSnake(INITIAL_SNAKE_LENGTH));
    setApple(createApple([]));
    setCoin(undefined);
    setCash(undefined);
    directionRef.current = [1, 0];
    nextDirectionRef.current = [1, 0];
    lastTimeRef.current = null;
  };

  return (
    <div>
      <h1>Super Snake</h1>
      <div>
        <progress value={applesEaten % 5} max={5} />
        {coin && <p>Coin dissapears in {coinTimer / 1000}s</p>}
        {cash && <p>Cash dissapears in {cashTimer / 1000}s</p>}
      </div>
      <GameCanvas
        snake={snake}
        apple={apple}
        coin={coin}
        cash={cash}
        cellSize={CELL_SIZE}
        canvasWidth={CANVAS_WIDTH}
        canvasHeight={CANVAS_HEIGHT}
      />
    </div>
  );
};

export default Game;
