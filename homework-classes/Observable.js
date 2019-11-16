'use strict';

{
  class Observable {
    constructor() {
      this.observers = new Set();
      // console.log(this.observers);
    }

    subscribe(observer = {}) {
      this.observers.add(observer);
      return () => this.observers.delete(observer);
    }

    notify(data) {
      this.observers.forEach(observer => observer.update(data));
    }
  }

  window.Observable = Observable;
}
