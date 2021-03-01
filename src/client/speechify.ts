import { io, Socket } from 'socket.io-client';
import { Data, StreamChunk } from '@common';
import { makeAutoObservable, observable } from 'mobx';

import {
  SpeechifyClient,
  ClientState,
} from '@common/client';

export default class SpeechifyClientImpl implements SpeechifyClient {

  readonly #HEADERS = { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' };

  #socket: Socket;

  state: ClientState = ClientState.NOT_PLAYING;
  loaded: Map<string, boolean> = observable.map({});

  constructor(host: string) {
    window.speechSynthesis.pause(); // Pause so the queue doesn't start playing automatically.

    this.#socket = io(host);
    this.#socket.on('onEnqueue', async () => {
      const chunk = await this.getNextChunk();
      if (chunk) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(chunk.text));
      }
    });

    makeAutoObservable(this);
  }

  async addToQueue(id: string, data: Data): Promise<void> {
    await ((await fetch('/api/addToQueue', {
      headers: this.#HEADERS,
      method: 'POST',
      body: JSON.stringify({id, data})
    })).json());
  }

  async getNextChunk(): Promise<StreamChunk | undefined> {
    try {
      const chunk = await ((await fetch('/api/getNextChunk', {
        headers: this.#HEADERS,
        method: 'GET',
      })).json());
      this.setLoaded(chunk.id);
      return { ...chunk };
    } catch (_e) {
      return undefined;
    }
  }

  setLoaded(id: string): void {
    this.loaded.set(id, true);
  }

  get getLoaded(): Map<string, boolean> {
    return this.loaded;
  }

  play(): void {
    this.state = ClientState.PLAYING;
    window.speechSynthesis.resume();
  }

  pause(): void {
    this.state = ClientState.NOT_PLAYING;
    window.speechSynthesis.pause();
  }

  togglePlayback(): ClientState {
    if (this.state === ClientState.PLAYING) {
      this.pause();
    } else {
      this.play();
    }
    return this.state;
  }

  getState(): ClientState {
    return this.state;
  }
}
