export default interface Queue<T> { 
  enqueue: (item: T) => void
  dequeue: (val: T) => void 
}