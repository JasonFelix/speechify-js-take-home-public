import { Data, DataType } from '@common';
import Processor from './Processor';
import ago from 's-ago';

export type MessageInterface = {
  from: string;
  channel: string;
  message: string;
  timeSent: string;
}

export default class SlackProcessor implements Processor {
  accept({type, source}: Pick<Data, 'type' | 'source'>): boolean {
    return type === DataType.JSON && source === 'https://slack.com/webhooks/chat';
  }

  process({ data }: Data): Promise<string> {
    const { from, channel, message, timeSent } = JSON.parse(data) as MessageInterface;
    const [_, ...name] = from;
    const fromName = _ === '@' ? name.join('') : from; // Remove @ from name if it exists
    return Promise.resolve(`In channel ${channel}, ${ago(new Date(timeSent))}, ${fromName} said ${message}`);
  }
}