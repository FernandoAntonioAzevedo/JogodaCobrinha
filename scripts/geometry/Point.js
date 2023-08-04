import { getRandomInt } from '../utils.js'; 

class Point {
  constructor (x, y, sign = ' ', color = '#000000') {
    this.x = x;
    this.y = y;
    this.sign = sign;
    this.color = color;
  }
  
  move = (vector) => {
    return new Point(this.x + vector.x, this.y + vector.y, this.sign, this.color);
  }
  
  isSame = (point) => {
    return point.x === this.x && point.y === this.y;
  }
  
  setSign = (sign) => {
    this.sign = sign;
  }
  
  setColor = (color) => {
    this.color = color;
  }
  
  toKey = () => `[${this.x},${this.y}]`;
  toString = () => this.toKey();
}

Point.draw = (sign = ' ', maxX, minX = 0, maxY = maxX, minY = minX) => {
  return new Point(getRandomInt(minX, maxX) , getRandomInt(minY, maxY), sign);
}

export default Point;