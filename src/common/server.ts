import { Data, StreamChunk } from '@common';

export interface SpeechifyServer {
  addToQueue(id: string, data: Data): void;
  getNextChunk(): StreamChunk | undefined;
}
