import { Data } from '@common';

export enum ClientEventType {
  STATE,
}

export enum ClientState {
  PLAYING,
  NOT_PLAYING,
}

type ClientStateEvent = {
  type: ClientEventType.STATE;
  state: ClientState;
};

export type SpeechifyClientEvent = ClientStateEvent;

export interface SpeechifyClient {
  addToQueue(id: string, data: Data): Promise<void>;
  play(): void;
  pause(): void;
}
