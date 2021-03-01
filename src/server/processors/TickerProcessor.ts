import { Data, DataType } from '@common';
import Processor from './Processor';
import fetch from 'node-fetch';
import CurrencyList from 'currency-list';

/**
 * Fetches relevant ticker info from Yahoo Finance
 */
export default class TickerProcessor implements Processor {
  accept({type, source}: Pick<Data, 'type' | 'source'>): boolean {
    return type === DataType.TXT && source === 'feeds.stock-ticker';
  }

  async process({ data }: Data): Promise<string> {
    type ResponseType = {
      company: string;
      currencyName: string;
      amount: string;
    }
    const processed = await data
      .split(/\n/g) // Split by line
      .map((str: string) => str.split(/\s/g)) // Split line spaces
      .map(async ([ticker, amount, currency]) => { // Map through Ticker Info
        const res = await fetch(`http://autoc.finance.yahoo.com/autoc?query=${ticker}&lang=en`) // Fetch company name from Yahoo Finance using ticker name
        const company = (await res.json()).ResultSet.Result[0].name; // Get company name from response
        const currencyName = CurrencyList.get(currency).name_plural; // Get plural name of currency
        return { company, currencyName, amount } as ResponseType;
      }).map(async (res: Promise<ResponseType>) => {
        const { company, currencyName, amount } = (await res as ResponseType);
        return `${company} is currently valued at ${amount} ${currencyName}`
      });
    return (await Promise.all(processed)).join('. '); // Add period for space when reading out the tickers
  }
}