import Game from '../engine/Game';
import Vector from '../geometry/Vector';
import Point from '../geometry/Point';

import Snake from './Snake';
import Apple from './Apple';

import {
  GOT_APPLE
} from './consts'

const SIZE = 40;
const INTERVAL_TIME = 100;

const LEFT = new Vector(-1, 0);
const RIGHT = new Vector(1, 0);
const UP = new Vector(0, -1);
const DOWN = new Vector(0, 1);

const INIT_SNAKE_SIZE = 10;
const INIT_SNAKE_VECTOR = DOWN;
const INIT_SNAKE_POINT = new Point(0, 0);

const SPEED_UP_FACTOR = 0.99;

const KEYBOARD_ARROW = {
  'ArrowRight': RIGHT,
  'ArrowLeft': LEFT,
  'ArrowUp': UP,
  'ArrowDown': DOWN
};

class SnakeGame extends Game {
  directionsBuffer = [];
  
  constructor (canvas) {
    super(canvas, SIZE, INTERVAL_TIME);
  }
  
  changeDirection = e => {
    const newDirection =  KEYBOARD_ARROW[e.code]; 
    const currentDir = this.directionsBuffer[this.directionsBuffer.length - 1] || this.direction;
    
    if (newDirection && !currentDir.add(newDirection).isZero() ) {
      this.directionsBuffer.push(newDirection); 
    }
  }

  drawApple () {
    this.apple = new Apple(this.size - 1);
    while(this.snake.collideWith(this.apple)) { 
      this.apple = new Apple(this.size - 1);
    }
  }
  
  render = () => {
    if (this.directionsBuffer.length === 0) {
      this.directionsBuffer.push(this.direction);
    } 

    while (this.directionsBuffer.length > 0) {
      this.direction = this.directionsBuffer.shift();
      this.snake.move(this.direction)
    } 

    if ( this.snake.collideWith(this.apple) ) {
      this.apples += 1;
      this.emit(GOT_APPLE, { apples: this.apples })
      this.drawApple();
      this.snake.grow(this.direction);
      this.speedUp();
    }

    this.draw(this.snake, 'Snake');
    this.draw(this.apple, 'Apple');
  }
   
  initGame = () => {
    
    this.directionsBuffer = [];
    this.snake = new Snake(INIT_SNAKE_SIZE, INIT_SNAKE_POINT, INIT_SNAKE_VECTOR);
    this.direction = INIT_SNAKE_VECTOR;
    this.apples = 0;
    this.gameIntervalTime = INTERVAL_TIME;
    
    this.drawApple();
  }
  
  speedUp = () => {
    this.stop();
    this.gameIntervalTime *= SPEED_UP_FACTOR;
    this.go();
  }
  
  beforeGo = () => {
    document.addEventListener('keydown', this.changeDirection);
  }
  
  afterStop = () => {
    document.removeEventListener('keydown', this.changeDirection);
  }
}

export default SnakeGame;

