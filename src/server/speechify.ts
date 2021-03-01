import { Data, StreamChunk } from '@common';
import { SpeechifyServer } from '@common/server';
import Parser from './Parser';
import { NodeQueue } from './Queues/NodeQueue';

export interface Observer { id: string; signal: () => void }
export default class MySpeechify implements SpeechifyServer {
  queue: NodeQueue<StreamChunk> = new NodeQueue<StreamChunk>();
  observers: Observer[] = [];

  addObserver(listener: Observer): void {
    this.observers.push(listener);
  }

  removeObserver(id: string): void {
    this.observers = this.observers.filter(ob => ob.id !== id);
  }

  addToQueue(id: string, data: Data): void {
    Parser.parse(data).then(text => {
      this.queue.enqueue({ id, source: data.source, text } );
      this.observers.forEach(l => l.signal());
    })
  }

  getNextChunk(): StreamChunk | undefined {
    return this.queue.dequeue();
  }
}
