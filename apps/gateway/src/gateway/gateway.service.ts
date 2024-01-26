import { Injectable } from '@nestjs/common';
import { BinanceService } from '@app/scrapers/binance/binance.service';

@Injectable()
export class GatewayService {
  constructor(private readonly binanceService: BinanceService) {}

  getHello() {
    return this.binanceService.get24hrChangeStatististics();
  }
}
