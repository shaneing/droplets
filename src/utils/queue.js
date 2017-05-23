class Queue {
  constructor() {
    this.elements = [];
    this.front = 0;
  }

  getLength() {
    return this.elements - this.front;
  }

  empty() {
    return this.elements.length === 0;
  }

  offer(element) {
    this.elements.push(element);
  }

  poll() {
    if (!this.empty()) {
      const element = this.elements[this.front];
      this.front += 1;
      if (2 * this.front >= this.elements.length) {
        this.elements = this.elements.slice(this.front);
        this.front = 0;
      }
      return element;
    }
    return null;
  }

  peek() {
    if (!this.empty()) {
      return this.elements[this.front];
    }
    return null;
  }
}

module.exports = Queue;
