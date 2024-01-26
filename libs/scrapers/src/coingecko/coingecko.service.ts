import { Injectable } from '@nestjs/common';
import { CoinGeckoClient } from 'coingecko-api-v3';

@Injectable()
export class CoingeckoService {
  private coingecko: CoinGeckoClient;

  constructor() {
    this.coingecko = new CoinGeckoClient();
  }

  async getCoinData(coingeckoId: string) {
    return this.coingecko.coinId({ id: coingeckoId });
  }
}
