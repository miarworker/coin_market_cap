import { Injectable, OnModuleInit } from '@nestjs/common';
import { BinanceService } from '@app/scrapers/binance/binance.service';
import { CoingeckoService } from '@app/scrapers/coingecko/coingecko.service';
import { Coin } from '@prisma/client';
import { PrismaService } from '@app/scrapers/db/prisma.service';
import { CoinFullInfo } from 'coingecko-api-v3';
import { OrderBookResponse } from 'binance';
import { CoinData } from '../gateway/dto/coinList.dto';
import BigNumber from 'bignumber.js';

@Injectable()
export class AggregatorService implements OnModuleInit {
  private coins: Coin[] = [];
  private coinDatas: CoinData[] = [];

  constructor(
    private readonly prismaService: PrismaService,
    private readonly binanceService: BinanceService,
    private readonly coingeckoService: CoingeckoService,
  ) {}

  async onModuleInit() {
    await this.updateCoinList();
  }

  getCoinsData() {
    const oneHourAgo = new Date(
      new Date().getTime() - 60 * 60 * 1000,
    ).getTime();
    const oneDayAgo = new Date(
      new Date().getTime() - 24 * 60 * 60 * 1000,
    ).getTime();
    const sevenDaysAgo = new Date(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
    ).getTime();

    for (const coin of this.coinDatas) {
      coin.chart.sort((a, b) => a.time.getTime() - b.time.getTime());
      const price1HBefore = coin.chart.find(
        ({ time }) => time.getTime() > oneHourAgo,
      );
      const price1DBefore = coin.chart.find(
        ({ time }) => time.getTime() > oneHourAgo,
      );
      const price7DBefore = coin.chart.find(
        ({ time }) => time.getTime() > oneHourAgo,
      );

      coin.change1H = BigNumber(1)
        .minus(BigNumber(coin.price).div(price1HBefore.price))
        .times(100)
        .toFixed(2);
      coin.change24H = BigNumber(1)
        .minus(BigNumber(coin.price).div(price1DBefore.price))
        .times(100)
        .toFixed(2);
      coin.change24H = BigNumber(1)
        .minus(BigNumber(coin.price).div(price7DBefore.price))
        .times(100)
        .toFixed(2);
    }

    return this.coinDatas;
  }

  async updateCoinList() {
    this.coins = await this.prismaService.coin.findMany();
    for (const coin of this.coins) {
      const coinData = this.coinDatas.find((c) => c.id === coin.id);
      if (coinData) continue;
      const prices = await this.prismaService.coinPrice.findMany({
        where: { cexId: 1, coinId: coin.id },
      });

      this.coinDatas.push({
        change1H: '',
        change24H: '',
        change7d: '',
        chart: prices.map((p) => ({ price: p.price, time: p.createdAt })),
        id: coin.id,
        marketCap: '',
        name: coin.name,
        price: '',
        supply: coin.totalSupply,
        symbol: coin.symbol,
        volume24H: '',
      });
    }
  }

  async updateMarketCap() {
    for (const coin of this.coins) {
      const coinFullInfo: CoinFullInfo =
        await this.coingeckoService.getCoinData(coin.coingeckoId);
      const circulatingSupply =
        coinFullInfo.market_data.circulating_supply.toString();
      const totalSupply = (
        coinFullInfo.market_data.max_supply as unknown as string
      ).toString();

      if (
        coin.circulatingSupply !== circulatingSupply ||
        coin.totalSupply !== totalSupply
      ) {
        this.coinDatas
          .filter((c) => c.id === coin.id)
          .forEach((coin) => {
            coin.supply = totalSupply;
            coin.marketCap = BigNumber(totalSupply).times(coin.price).toFixed();
          });

        await this.prismaService.coin.update({
          where: { id: coin.id },
          data: { circulatingSupply, totalSupply },
        });
      }
    }
  }

  async updatePrices() {
    for (const coin of this.coins) {
      const orderBook: OrderBookResponse =
        await this.binanceService.getOrderBook(coin.symbol, 'USDT');
      const price = orderBook.asks[0][0].toString();

      this.coinDatas
        .filter((c) => c.id === coin.id)
        .forEach((coin) => {
          coin.price = price;
          coin.marketCap = BigNumber(coin.supply).times(price).toFixed();
          coin.chart.push({ time: new Date(), price });
        });

      await this.prismaService.coinPrice.create({
        data: {
          cexId: 1,
          coinId: coin.id,
          price,
        },
      });
    }
  }
}
