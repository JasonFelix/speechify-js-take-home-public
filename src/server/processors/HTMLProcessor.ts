import { Data, DataType } from '@common';
import Processor from './Processor';

export default class HTMLProcessor implements Processor {
  accept({type, source}: Pick<Data, 'type' | 'source'>): boolean {
    return type === DataType.HTML && source === 'https://speechify.com/welcome';
  }

  process({ data }: Data): Promise<string> {
    return Promise.resolve(data
      .replace(/(<([^>]+)>)/gi, '') // Remove html tags
      .trim()                       // Trim surrounding spaces
      .replace(/[ \t]{2,}/gi, ', ') // Replace tabs and multiple spaces with 1 space
    );
  }
}