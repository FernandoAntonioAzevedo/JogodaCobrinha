import EventListener from './EventListener';
import { ERROR, STEP, START, PAUSE, RESUME } from './consts';

const EMPTY_CELL = ' ';

class Game extends EventListener {
  constructor (canvas, size, gameIntervalTime) {
    super();
    this.canvas = canvas;
    this.size = size;
    this.gameIntervalTime = gameIntervalTime;
  }
  
  clear () {
    this.game = (new Array(this.size));
    
    for (let i = 0; i < this.game.length; i++) {
      this.game[i] = new Array(this.size);
      this.game[i].fill(EMPTY_CELL);
    }
  }

  draw ({ body }, displayName) {   
    for (let i = 0; i < body.length; i++) {
      const { x, y, sign, color } = body[i];
      this.isOutOfBound(body[i], displayName); 
      this.game[x][y] = `<span class="point" style="background: ${color};">${sign}</span>`
    }
  }

  isOutOfBound ({ x, y }, displayName = 'Object') {
    if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
      throw new Error(`${displayName} is out of bound`);
    }
  }
  
  renderCanvas = () => {
    let canvasBuffer = '';
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        canvasBuffer += this.game[y][x];
      }
      canvasBuffer += '\n';
    }

    this.clear();
    this.canvas.innerHTML = canvasBuffer;
  }
  
  stop = () => {
    clearInterval(this.gameInterval);
    this.gameInterval = null;
    this.afterStop();
  }
  
  step = () => {
    try {
      this.emit(STEP, { drawObject: this.draw });
      this.render();
      this.renderCanvas();     
    } catch (error) {
      this.emit(ERROR, { errorMsg: error.message });
      this.stop();  
    }
  }
  
  go = () => {
    this.beforeGo();
    this.gameInterval = setInterval(this.step, this.gameIntervalTime);
  }
  
  pause = () => {
    if (this.gameInterval) {
      this.stop();
      this.emit(PAUSE);
    } else {
      this.go();
      this.emit(RESUME);
    }
  }
  
  start = () => {
    this.emit(START);
    this.stop();
    this.clear(); 
    this.initGame();
    this.renderCanvas();
    this.go()
  }
}

export default Game;

