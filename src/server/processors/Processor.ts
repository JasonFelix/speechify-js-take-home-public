import { Data } from '@common';

interface Processor {
  accept: ({ type, source }: Pick<Data, 'type' | 'source'>) => boolean;
  process: (data: Data) => Promise<string>;
}

export default Processor;