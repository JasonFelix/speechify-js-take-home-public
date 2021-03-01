import Queue from './Queue';

export class ArrayQueue<T> implements Queue<T> {
  #items: Array<T> = [];

  enqueue = (val: T): void => {
    this.#items.push(val);
  };

  dequeue = (): T | undefined =>  this.#items.shift();
}