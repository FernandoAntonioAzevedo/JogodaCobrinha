import Point from '../geometry/Point';
import GameObject from '../engine/GameObject';

const COLOR = '#aa0000';

class Apple extends GameObject {
  constructor(gameSize) {
    super();
    const point = Point.draw(' ', gameSize);
    point.setColor(COLOR)
    this.body = [point];
  }
}

export default Apple;