class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
    add (vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    }
    
    isZero = () => this.x === 0 && this.y === 0;
  }
  
  export default Vector;