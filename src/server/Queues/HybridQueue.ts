import Queue from './Queue';

export default class HybridQueue<T> implements Queue<T> {
  #items: Array<T> = [];
  #head = 0;
  #tail = 0;

  enqueue = (item: T): void => {
    this.#items[this.#tail] = item;
    this.#tail++;
  };

  dequeue = (): T => {
    const item: T = this.#items[this.#head];
    delete this.#items[this.#head];
    this.#head++;
    return item;
  };
}