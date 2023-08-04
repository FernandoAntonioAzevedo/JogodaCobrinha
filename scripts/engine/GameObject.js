class GameObject {
    collideWith = ({ body }) => {
      const bodyDict = this.bodyToDict();
      for (let i = 0; i < body.length; i++) {
        const pointKey = body[i].toKey();
        if (bodyDict[pointKey]) {
          return true;
        }
      }
      
      return false; 
    }
    
    bodyToDict = () => this.body.reduce((dict, point) => {
      dict[point.toKey()] = 1;
      return dict;
    }, {})
    
  }
  
  export default GameObject;