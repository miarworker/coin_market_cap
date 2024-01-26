import { Injectable } from '@nestjs/common';
import { MainClient as BinanceClient } from 'binance';
import * as process from 'process';

@Injectable()
export class BinanceService {
  private readonly binanceClient: BinanceClient;

  constructor() {
    this.binanceClient = new BinanceClient({
      api_key: process.env.BINANCE_API_KEY,
      api_secret: process.env.BINANCE_API_SECRET,
    });
  }

  async get24hrChangeStatististics() {
    return this.binanceClient.get24hrChangeStatististics({ symbol: 'XRPUSDT' });
  }
}
