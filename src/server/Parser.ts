import { Data } from '@common';
import Processor from './processors/Processor';
import HTMLProcessor from './processors/HTMLProcessor';
import TickerProcessor from './processors/TickerProcessor';
import SlackProcessor from './processors/SlackProcessor';

export default class Parser {
  static readonly PROCESSORS: Processor[] = [
    new HTMLProcessor(),
    new TickerProcessor(),
    new SlackProcessor(),
  ]

  static async parse(data: Data): Promise<string> {
    const processor = Parser.PROCESSORS.find(processor => processor.accept(data));
    if (!processor) {
      throw new Error(`No processor exists for type: ${data.type}, source: ${data.source}`);
    }
    return await processor.process(data);
  }
}