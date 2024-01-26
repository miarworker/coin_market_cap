import { Module } from '@nestjs/common';
import { BinanceService } from '@app/scrapers/binance/binance.service';

@Module({
  providers: [BinanceService],
  exports: [BinanceService],
})
export class BinanceModule {}
