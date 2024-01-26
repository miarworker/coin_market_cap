import { Module } from '@nestjs/common';
import { BinanceService } from '@app/scrapers/binance/binance.service';
import { AggregatorService } from './aggregator.service';
import { CoingeckoService } from '@app/scrapers/coingecko/coingecko.service';
import { PrismaService } from '@app/scrapers/db/prisma.service';

@Module({
  providers: [
    PrismaService,
    BinanceService,
    CoingeckoService,
    AggregatorService,
  ],
  exports: [AggregatorService],
})
export class AggregatorModule {}
