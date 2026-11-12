import { useState, useEffect, useRef, useCallback } from 'react';
import { GameOverData } from '../components/game/GameOverModal';

export const ROWS = 29;
export const COLS = 29;
export const INITIAL_SNAKE_LENGTH = 3;
export const SLOW_SPEED = 150;
export const NORMAL_SPEED = 100;
export const FAST_SPEED = 50;
export const COIN_TIMEOUT = 3000;
export const CASH_TIMEOUT = 3000;
export const CASH_CHANCE = 0.2;

export interface GameSettingsInput {
  gameMode: string;
  apples: string;
  walls: string;
  speed: string;
}

export const createSnake = (length: number): [number, number][] => {
  return Array.from({ length }, (_, i) => [10, 10 - i] as [number, number]);
};

export const createOpponentSnake = (length: number): [number, number][] => {
  return Array.from({ length }, (_, i) => [19, 19 + i] as [number, number]);
};

export const setWalls = (): [number, number][] => {
  const walls: [number, number][] = [];
  for (let x = 0; x < ROWS; x++) {
    walls.push([x, 0]);
    walls.push([x, COLS - 1]);
  }
  for (let y = 0; y < COLS; y++) {
    walls.push([0, y]);
    walls.push([ROWS - 1, y]);
  }
  return walls;
};

export const createApple = (forbidden: [number, number][]): [number, number] => {
  let apple: [number, number];
  do {
    apple = [
      Math.floor(Math.random() * ROWS),
      Math.floor(Math.random() * COLS),
    ];
  } while (forbidden.some(([x, y]) => x === apple[0] && y === apple[1]));
  return apple;
};

export const createFirstApples = (
  forbidden: [number, number][],
  numberOfApples: number
): [number, number][] => {
  const apples: [number, number][] = [];
  for (let i = 1; i <= numberOfApples; i++) {
    const apple = createApple([...forbidden, ...apples]);
    apples.push(apple);
  }
  return apples;
};

export const createCoin = (forbidden: [number, number][]): [number, number] => {
  let coin: [number, number];
  do {
    coin = [Math.floor(Math.random() * ROWS), Math.floor(Math.random() * COLS)];
  } while (forbidden.some(([x, y]) => x === coin[0] && y === coin[1]));
  return coin;
};

export const createCash = (forbidden: [number, number][]): [number, number][] => {
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

export const getSpeedMs = (speedSetting?: string): number => {
  switch (speedSetting) {
    case 'Slow':
      return SLOW_SPEED;
    case 'Normal':
      return NORMAL_SPEED;
    case 'Fast':
      return FAST_SPEED;
    default:
      return NORMAL_SPEED;
  }
};

export const useSnakeEngine = (
  settings: GameSettingsInput,
  onExitCallback?: () => void
) => {
  const isMultiplayer = settings?.gameMode?.includes('1v1') || false;
  const numberOfApples = Number.isFinite(parseInt(settings?.apples, 10))
    ? parseInt(settings.apples, 10)
    : 1;
  const areWalls = settings?.walls === 'On';
  const walls = areWalls ? setWalls() : [];
  const speed = getSpeedMs(settings?.speed);

  const [snake, setSnake] = useState<[number, number][]>(() =>
    createSnake(INITIAL_SNAKE_LENGTH)
  );
  const [opponentSnake, setOpponentSnake] = useState<[number, number][]>(() =>
    isMultiplayer ? createOpponentSnake(INITIAL_SNAKE_LENGTH) : []
  );

  const directionRef = useRef<[number, number][]>([
    [1, 0],
    [-1, 0],
  ]);
  const nextDirectionRef = useRef<[number, number][]>([
    [1, 0],
    [-1, 0],
  ]);

  const lastTimeRef = useRef<number | null>(null);
  const opponentLastTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);
  const lastBonusTotal = useRef(0);

  const [apples, setApples] = useState<[number, number][]>(() =>
    createFirstApples([...walls, ...createSnake(INITIAL_SNAKE_LENGTH)], numberOfApples)
  );
  const [coin, setCoin] = useState<[number, number] | undefined>(undefined);
  const [cash, setCash] = useState<[number, number][] | undefined>(undefined);

  const [applesEaten, setApplesEaten] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [cashEarned, setCashEarned] = useState(0);

  const [opponentApplesEaten, setOpponentApplesEaten] = useState(0);
  const [opponentCoinsEarned, setOpponentCoinsEarned] = useState(0);
  const [opponentCashEarned, setOpponentCashEarned] = useState(0);

  const [timerStart, setTimerStart] = useState<number | null>(Date.now());
  const [timerDuration, setTimerDuration] = useState<number>(0);

  const [startTime, setStartTime] = useState<number>(Date.now());
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverData, setGameOverData] = useState<GameOverData | null>(null);

  const resetGameState = useCallback(() => {
    setApplesEaten(0);
    setCoinsEarned(0);
    setCashEarned(0);
    setOpponentApplesEaten(0);
    setOpponentCoinsEarned(0);
    setOpponentCashEarned(0);
    setTimerDuration(0);
    const initialSnake = createSnake(INITIAL_SNAKE_LENGTH);
    const initialOpponent = isMultiplayer ? createOpponentSnake(INITIAL_SNAKE_LENGTH) : [];
    setSnake(initialSnake);
    setOpponentSnake(initialOpponent);
    setApples(
      createFirstApples([...walls, ...initialSnake, ...initialOpponent], numberOfApples)
    );
    setCoin(undefined);
    setCash(undefined);
    directionRef.current = [
      [1, 0],
      [-1, 0],
    ];
    nextDirectionRef.current = [
      [1, 0],
      [-1, 0],
    ];
    lastTimeRef.current = null;
    opponentLastTimeRef.current = null;
    setStartTime(Date.now());
    setGameOverData(null);
    setShowGameOver(false);
  }, [isMultiplayer, numberOfApples, walls]);

  const onGameOver = useCallback(
    (cause: string) => {
      setGameOverData({
        cause,
        applesEaten,
        coinsEarned,
        cashEarned,
        isMultiplayer,
        opponentApplesEaten,
        opponentCoinsEarned,
        opponentCashEarned,
        timePlayed: Date.now() - (startTime || 0),
        onPlayAgain: resetGameState,
        onExit: () => {
          if (onExitCallback) onExitCallback();
        },
      });
      setShowGameOver(true);
    },
    [
      applesEaten,
      coinsEarned,
      cashEarned,
      isMultiplayer,
      opponentApplesEaten,
      opponentCoinsEarned,
      opponentCashEarned,
      startTime,
      resetGameState,
      onExitCallback,
    ]
  );

  // Key controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
          if (directionRef.current[0][1] === 0) nextDirectionRef.current[0] = [0, -1];
          break;
        case 's':
          if (directionRef.current[0][1] === 0) nextDirectionRef.current[0] = [0, 1];
          break;
        case 'a':
          if (directionRef.current[0][0] === 0) nextDirectionRef.current[0] = [-1, 0];
          break;
        case 'd':
          if (directionRef.current[0][0] === 0) nextDirectionRef.current[0] = [1, 0];
          break;
        case 'ArrowUp':
          if (directionRef.current[1][1] === 0) nextDirectionRef.current[1] = [0, -1];
          break;
        case 'ArrowDown':
          if (directionRef.current[1][1] === 0) nextDirectionRef.current[1] = [0, 1];
          break;
        case 'ArrowLeft':
          if (directionRef.current[1][0] === 0) nextDirectionRef.current[1] = [-1, 0];
          break;
        case 'ArrowRight':
          if (directionRef.current[1][0] === 0) nextDirectionRef.current[1] = [1, 0];
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main game animation loop
  useEffect(() => {
    if (showGameOver) return;

    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;

      if (delta > speed) {
        directionRef.current[0] = nextDirectionRef.current[0];

        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const head = newSnake[0];
          const newHead: [number, number] = [
            (head[0] + directionRef.current[0][0] + ROWS) % ROWS,
            (head[1] + directionRef.current[0][1] + COLS) % COLS,
          ];
          newSnake.unshift(newHead);
          newSnake.pop();
          return newSnake;
        });
        lastTimeRef.current = time;
      }

      if (isMultiplayer) {
        if (!opponentLastTimeRef.current) {
          opponentLastTimeRef.current = time;
        }
        const deltaOpponent = time - opponentLastTimeRef.current;

        if (deltaOpponent > speed) {
          directionRef.current[1] = nextDirectionRef.current[1];

          setOpponentSnake((prevOpponentSnake) => {
            const newOpponentSnake = [...prevOpponentSnake];
            const head = newOpponentSnake[0];
            const newHead: [number, number] = [
              (head[0] + directionRef.current[1][0] + ROWS) % ROWS,
              (head[1] + directionRef.current[1][1] + COLS) % COLS,
            ];
            newOpponentSnake.unshift(newHead);
            newOpponentSnake.pop();
            return newOpponentSnake;
          });

          opponentLastTimeRef.current = time;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [showGameOver, speed, isMultiplayer]);

  // Food consumption helper
  const onAppleEaten = useCallback(
    (
      eatenApple: [number, number],
      snakeSetter: React.Dispatch<React.SetStateAction<[number, number][]>>,
      scoreSetter: React.Dispatch<React.SetStateAction<number>>
    ) => {
      snakeSetter((prev) => {
        const next = [...prev];
        next.push(next[next.length - 1]);
        return next;
      });

      setApples((prev) => {
        const remaining = prev.filter((a) => a[0] !== eatenApple[0] || a[1] !== eatenApple[1]);
        const newApple = createApple([...walls, ...snake, ...opponentSnake, ...remaining]);
        return [...remaining, newApple];
      });

      scoreSetter((prev) => prev + 1);
    },
    [walls, snake, opponentSnake]
  );

  // Bonus spawning
  useEffect(() => {
    const totalApples = applesEaten + opponentApplesEaten;
    if (totalApples > 0 && totalApples % 5 === 0 && lastBonusTotal.current !== totalApples) {
      lastBonusTotal.current = totalApples;

      if (Math.random() < CASH_CHANCE) {
        setCash(createCash([...walls, ...snake, ...opponentSnake, ...apples]));
        setTimerStart(Date.now());
        setTimerDuration(CASH_TIMEOUT);
      } else {
        setCoin(createCoin([...walls, ...snake, ...opponentSnake, ...apples]));
        setTimerStart(Date.now());
        setTimerDuration(COIN_TIMEOUT);
      }
    }
  }, [applesEaten, opponentApplesEaten, walls, snake, opponentSnake, apples]);

  // Collisions between snakes
  useEffect(() => {
    if (!isMultiplayer || showGameOver) return;
    const head = snake[0];
    const opponentHead = opponentSnake[0];

    for (let i = 0; i < opponentSnake.length; i++) {
      if (head && head[0] === opponentSnake[i][0] && head[1] === opponentSnake[i][1]) {
        onGameOver('You collided with the opponent snake');
        return;
      }
    }

    for (let i = 0; i < snake.length; i++) {
      if (opponentHead && opponentHead[0] === snake[i][0] && opponentHead[1] === snake[i][1]) {
        onGameOver('Opponent collided with your snake');
        return;
      }
    }
  }, [snake, opponentSnake, isMultiplayer, onGameOver, showGameOver]);

  // Self-collision
  useEffect(() => {
    if (showGameOver) return;
    const head = snake[0];
    const body = snake.slice(1);
    if (head && body.some(([x, y]) => x === head[0] && y === head[1])) {
      onGameOver('You collided with your own body');
    }

    if (isMultiplayer) {
      const oppHead = opponentSnake[0];
      const oppBody = opponentSnake.slice(1);
      if (oppHead && oppBody.some(([x, y]) => x === oppHead[0] && y === oppHead[1])) {
        onGameOver('Opponent collided with their own body');
      }
    }
  }, [snake, opponentSnake, isMultiplayer, onGameOver, showGameOver]);

  // Wall collisions
  useEffect(() => {
    if (showGameOver || !areWalls) return;
    const head = snake[0];
    if (head && walls.some(([x, y]) => x === head[0] && y === head[1])) {
      onGameOver('You collided with a wall');
    }

    if (isMultiplayer) {
      const oppHead = opponentSnake[0];
      if (oppHead && walls.some(([x, y]) => x === oppHead[0] && y === oppHead[1])) {
        onGameOver('Opponent collided with a wall');
      }
    }
  }, [snake, opponentSnake, walls, areWalls, isMultiplayer, onGameOver, showGameOver]);

  // Apple collision
  useEffect(() => {
    if (showGameOver) return;
    const head = snake[0];
    for (let i = 0; i < apples.length; i++) {
      if (head && head[0] === apples[i][0] && head[1] === apples[i][1]) {
        onAppleEaten(apples[i], setSnake, setApplesEaten);
      }
    }

    if (isMultiplayer) {
      const oppHead = opponentSnake[0];
      for (let i = 0; i < apples.length; i++) {
        if (oppHead && oppHead[0] === apples[i][0] && oppHead[1] === apples[i][1]) {
          onAppleEaten(apples[i], setOpponentSnake, setOpponentApplesEaten);
        }
      }
    }
  }, [snake, opponentSnake, apples, isMultiplayer, onAppleEaten, showGameOver]);

  // Coin collision
  useEffect(() => {
    if (!coin || showGameOver) return;
    const head = snake[0];
    if (head && head[0] === coin[0] && head[1] === coin[1]) {
      setCoin(undefined);
      setCoinsEarned((prev) => prev + 1);
      setTimerDuration(0);
    }

    if (isMultiplayer) {
      const oppHead = opponentSnake[0];
      if (oppHead && oppHead[0] === coin[0] && oppHead[1] === coin[1]) {
        setCoin(undefined);
        setOpponentCoinsEarned((prev) => prev + 1);
        setTimerDuration(0);
      }
    }
  }, [snake, opponentSnake, coin, isMultiplayer, showGameOver]);

  // Cash collision
  useEffect(() => {
    if (!cash || showGameOver) return;
    const head = snake[0];
    if (head && cash.some(([x, y]) => x === head[0] && y === head[1])) {
      setCash(undefined);
      setCashEarned((prev) => prev + 1);
      setTimerDuration(0);
    }

    if (isMultiplayer) {
      const oppHead = opponentSnake[0];
      if (oppHead && cash.some(([x, y]) => x === oppHead[0] && y === oppHead[1])) {
        setCash(undefined);
        setOpponentCashEarned((prev) => prev + 1);
        setTimerDuration(0);
      }
    }
  }, [snake, opponentSnake, cash, isMultiplayer, showGameOver]);

  // Bonus timeouts
  useEffect(() => {
    if (coin && timerStart && timerDuration > 0) {
      const timeout = setTimeout(() => {
        setCoin(undefined);
        setTimerDuration(0);
      }, timerDuration);
      return () => clearTimeout(timeout);
    }
  }, [coin, timerStart, timerDuration]);

  useEffect(() => {
    if (cash && timerStart && timerDuration > 0) {
      const timeout = setTimeout(() => {
        setCash(undefined);
        setTimerDuration(0);
      }, timerDuration);
      return () => clearTimeout(timeout);
    }
  }, [cash, timerStart, timerDuration]);

  return {
    snake,
    opponentSnake,
    walls,
    apples,
    coin,
    cash,
    applesEaten,
    coinsEarned,
    cashEarned,
    opponentApplesEaten,
    opponentCoinsEarned,
    opponentCashEarned,
    timerStart,
    timerDuration,
    showGameOver,
    gameOverData,
    resetGameState,
  };
};
