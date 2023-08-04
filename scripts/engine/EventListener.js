class EventListener {
    listeners = {};
  
    addEventListener = (name, fn) => {
      if (!this.listeners[name]) {
        this.listeners[name] = [];
      }
      if (fn) {
        this.listeners[name].push(fn);
      }
    }
  
    removeEventListener = (name, fn) => {
      if (this.listeners[name]) {
        this.listeners[name] = this.listeners[name].filter(lfn => lfn !== fn);
      }
    }
  
    emit = (name, event) => {
      if (this.listeners[name]) {
        this.listeners[name].forEach(lfn => { lfn(event); });
      }
    }
  
  }
  
  export default EventListener;