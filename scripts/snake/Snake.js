import GameObject from '../engine/GameObject';

const HEAD = ' ';
const BODY = ' ';
const COLOR = '#5400a3';

const EATEN_ITSELF_ERROR = 'You have eaten yourself, what a shame!';

class Snake extends GameObject { 
  isGrowing = false;

  constructor(size, startPoint, startVector) {
    super();
    startPoint.setColor(COLOR);
    this.body = [startPoint];
    
    let i = 0;
    while (i < size - 1) {
      this.growHead(startVector);
      i++;
    }
  }
  
  growHead (vector) {
    const head = this.body[this.body.length - 1];
    head.setSign(BODY);
    
    const newHead = head.move(vector);
    for (let i = 0; i < this.body.length; i++) {
      if (newHead.isSame(this.body[i])) {
        throw new Error(EATEN_ITSELF_ERROR);
      }
    }
    
    newHead.setSign(HEAD);
    this.body.push(newHead);
  }
  
  grow () {
    this.isGrowing = true;
  }
  
  move (vector) {
    if (!this.isGrowing) {
      this.body.shift();
    } 
    this.isGrowing = false;
    this.growHead(vector);
  }
}

export default Snake;