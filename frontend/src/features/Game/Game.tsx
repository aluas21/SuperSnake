import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import GameCanvas from '../../components/GameCanvas';
import Header from '../../components/Header/Header';
import Score from '../../components/Score/Score';
import './Game.css';

const ROWS = 29;
const COLS = 29;
const INITIAL_SNAKE_LENGTH = 3;
// lower values mean more frames = snake moves quicker
const SLOW_SPEED = 150;
const NORMAL_SPEED = 100;
const FAST_SPEED = 50;
const COIN_TIMEOUT = 3000; // 3 seconds
const CASH_TIMEOUT = 3000; // 3 seconds
const CASH_CHANCE = 0.2; // 20% chance to spawn cash
const HEIGHT_PERCENTAGE = 0.85; // 85% of available height

const createSnake = (length: number): [number, number][] => {
  return Array.from({ length }, (_, i) => [10, 10 - i] as [number, number]);
};

const createFirstApples = (
  forbidden: [number, number][],
  numberOfApples: number
): [number, number][] => {
  let apples: [number, number][] = [];
  for (let i = 1; i <= numberOfApples; i++) {
    const apple = createApple([...forbidden, ...apples]);
    apples.push(apple);
  }
  return apples;
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

const setSpeed = (speedSetting: string): number => {
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

const setWalls = (): [number, number][] => {
  let walls: [number, number][] = [];
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

const Game: React.FC = () => {
  const location = useLocation();
  const settings = location.state;

  const numberOfApples = Number.isFinite(parseInt(settings.apples))
    ? parseInt(settings.apples) + 1
    : 1;
  const areWalls = settings.walls === 'On';
  const walls = areWalls ? setWalls() : [];
  const speed =
    typeof settings.speed === 'string'
      ? setSpeed(settings.speed)
      : NORMAL_SPEED;

  const [snake, setSnake] = useState<[number, number][]>(
    createSnake(INITIAL_SNAKE_LENGTH)
  );

  const directionRef = useRef<[number, number]>([1, 0]); // moving right by default
  const nextDirectionRef = useRef<[number, number]>([1, 0]);

  const lastTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  const [apples, setApples] = useState<[number, number][]>(
    createFirstApples([...walls, ...snake], numberOfApples)
  );
  const [coin, setCoin] = useState<[number, number]>();
  const [cash, setCash] = useState<[number, number][]>();

  const [applesEaten, setApplesEaten] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [cashEarned, setCashEaten] = useState(0);

  const [timerStart, setTimerStart] = useState<number | null>(null);
  const [timerDuration, setTimerDuration] = useState<number>(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(15); // default cell size

  // calculate cell size based on available height
  useEffect(() => {
    const updateCellSize = () => {
      if (infoRef.current && headerRef.current) {
        const availableHeight =
          (window.innerHeight -
            infoRef.current.offsetHeight -
            headerRef.current.offsetHeight) *
          HEIGHT_PERCENTAGE;
        const newSize = Math.floor(availableHeight / ROWS);
        setCellSize(newSize > 5 ? newSize : 5); // minimum cell size of 5
      }
    };
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [infoRef, headerRef]);

  const canvasWidth = COLS * cellSize;
  const canvasHeight = ROWS * cellSize;

  // game loop
  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const delta = time - lastTimeRef.current;

      if (delta > speed) {
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

  const onAppleEaten = (eatenApple: [number, number]) => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      newSnake.push(newSnake[newSnake.length - 1]); // grow the snake
      return newSnake;
    });

    setApples((prevApples) => {
      const updatedApples = prevApples.filter((apple) => apple !== eatenApple);
      const newApple = createApple([...walls, ...snake, ...updatedApples]);
      return [...updatedApples, newApple];
    });

    const newCount = applesEaten + 1;
    setApplesEaten(newCount);

    if (newCount % 5 === 0 && !coin && !cash) {
      if (Math.random() < CASH_CHANCE) {
        setCash(createCash([...walls, ...snake, ...apples]));
        setTimerStart(Date.now());
        setTimerDuration(CASH_TIMEOUT);
      } else {
        setCoin(createCoin([...walls, ...snake, ...apples]));
        setTimerStart(Date.now());
        setTimerDuration(COIN_TIMEOUT);
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

  // check for wall collisions
  useEffect(() => {
    const head = snake[0];
    if (walls.some(([x, y]) => x === head[0] && y === head[1])) {
      resetGame();
    }
  }, [snake]);

  // check for apple collision
  useEffect(() => {
    const head = snake[0];
    for (let i = 1; i < apples.length; i++) {
      if (head[0] === apples[i][0] && head[1] === apples[i][1]) {
        onAppleEaten(apples[i]);
      }
    }
  }, [snake, apples]);

  // check for coin collision
  useEffect(() => {
    if (!coin) return;
    const head = snake[0];
    if (head[0] === coin[0] && head[1] === coin[1]) {
      setCoin(undefined);
      setCoinsEarned((prev) => prev + 1);
      setTimerDuration(0);
    }
  }, [snake, coin]);

  // check for cash collision
  useEffect(() => {
    if (!cash) return;
    const head = snake[0];
    if (cash.some(([x, y]) => x === head[0] && y === head[1])) {
      setCash(undefined);
      setCashEaten((prev) => prev + 1);
      setTimerDuration(0);
    }
  }, [snake, cash]);

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

  const resetGame = () => {
    alert(
      'Game Over! You ate ' +
        applesEaten +
        ' apples, ' +
        coinsEarned +
        ' coins and ' +
        cashEarned +
        ' cash.'
    );
    setApplesEaten(0);
    setCoinsEarned(0);
    setCashEaten(0);
    setTimerDuration(0);
    setSnake(createSnake(INITIAL_SNAKE_LENGTH));
    setApples([]);
    setCoin(undefined);
    setCash(undefined);
    directionRef.current = [1, 0];
    nextDirectionRef.current = [1, 0];
    lastTimeRef.current = null;
  };

  return (
    <>
      <Header pageTitle="Game" ref={headerRef} />
      <div className="game__container">
        <Score
          playerName="Player 1"
          score={applesEaten}
          coins={coinsEarned}
          cash={cashEarned}
        />
        <div className="game__board">
          <div className="game__info" ref={infoRef}>
            <progress
              className="game__progress-bar"
              value={applesEaten % 5}
              max={5}
            />
            {/* <TimerBar startTime={timerStart} duration={timerDuration} /> */}
          </div>
          <GameCanvas
            snake={snake}
            walls={walls}
            apples={apples}
            coin={coin}
            cash={cash}
            cellSize={cellSize}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />
        </div>
        <Score playerName="Player 2" score={999} coins={999} cash={999} />
      </div>
    </>
  );
};

export default Game;
