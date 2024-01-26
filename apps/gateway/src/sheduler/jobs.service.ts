import { Injectable } from '@nestjs/common';
import { AggregatorService } from '../aggregator/aggregator.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JobsService {
  constructor(private readonly aggregatorService: AggregatorService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async updateCoinList() {
    await this.aggregatorService.updateCoinList();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async updateMarketCap() {
    await this.aggregatorService.updateMarketCap();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async updatePrices() {
    await this.aggregatorService.updatePrices();
  }
}
