import Queue from './Queue';

interface Node<T> {
  val: T;
  next: Node<T> | undefined;
}

export class NodeQueue<T> implements Queue<T> {
  #head: Node<T> | undefined = undefined;
  #tail: Node<T> | undefined = undefined;

  enqueue = (val: T): void => {
    const node = { val } as Node<T>;
    if (!this.#head || !this.#tail) {
      this.#head = node;
      this.#tail = this.#head;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }
  };

  dequeue = (): T | undefined => {
    if (!this.#head) return undefined;
    const node = this.#head.val;
    this.#head = this.#head.next;
    return node;
  };
}