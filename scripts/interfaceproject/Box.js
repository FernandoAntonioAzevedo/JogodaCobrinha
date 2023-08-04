class Box {
    constructor (id) {
      this.box = document.getElementById(id);
    }
    
    display = (text) => {
      this.box.innerHTML = text;
    }
    
  }
  
  export default Box;