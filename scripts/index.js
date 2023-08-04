import SnakeGame from './snake/Game';
import { GOT_APPLE } from './snake/consts';
import { ERROR, START, PAUSE, RESUME } from './engine/consts';

import Box from './interface/Box';

const SNAKE_SOUND = new Audio('https://sndup.net/3bcm/ekans.mp3');
const SOUNDTRACK = new Audio('https://sndup.net/2dd6/Pokemon.mp3');
SOUNDTRACK.volume = 0.1;

const canvas = document.getElementById('game-canvas');
const gameContainer = document.getElementById('game');
const gamesBtns = document.getElementById('games-btns');

const gameSnakeBtn = document.getElementById('snake-game');
const gameCrushBtn = document.getElementById('crush-game');


const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');

const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn'); 
const upBtn = document.getElementById('up-btn');
const downBtn = document.getElementById('down-btn');

gameSnakeBtn.addEventListener('click', () => {
  gameContainer.classList.remove('hidden');
  gamesBtns.classList.add('hidden');
  
  const game = new SnakeGame(canvas);

  startBtn.addEventListener('click', game.start);
  pauseBtn.addEventListener('click', game.pause);

  leftBtn.addEventListener('click', () => {
    game.changeDirection({ code: 'ArrowLeft' });
  });

  rightBtn.addEventListener('click', () => {
    game.changeDirection({ code: 'ArrowRight' });
  });

  upBtn.addEventListener('click', () => {
    game.changeDirection({ code: 'ArrowUp' });
  });

  downBtn.addEventListener('click', () => {
    game.changeDirection({ code: 'ArrowDown' });
  });

  const infoBox = new Box('info-box');
  const errorBox = new Box('error-box');

  game.addEventListener(GOT_APPLE, ({ apples }) => {
    infoBox.display(`Apples: ${apples}`);
    SNAKE_SOUND.play();
  });

  game.addEventListener(ERROR, ({ errorMsg }) => {
    errorBox.display(`Game over! ${errorMsg}`);
  });

  game.addEventListener(START, () => {
    SOUNDTRACK.currentTime = 0;
    SOUNDTRACK.play();
    infoBox.display(`Apples: 0`);
    errorBox.display('');
  });

  game.addEventListener(PAUSE, () => {
    SOUNDTRACK.pause();
  });

  game.addEventListener(RESUME, () => {
    SOUNDTRACK.play();
  });
})


