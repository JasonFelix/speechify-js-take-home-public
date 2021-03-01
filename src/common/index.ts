export enum DataType {
  HTML = 'HTML',
  TXT = 'TXT',
  JSON = 'JSON',
}

export type Data = {
  type: DataType;
  source: string;
  data: string;
};

export type StreamChunk = {
  id: string;
  source: string;
  text: string;
};

export interface Speechify {
  addToQueue(id: string, data: Data): boolean;
  getNextChunk(): StreamChunk | undefined;
}
