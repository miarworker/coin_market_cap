import { Injectable } from '@nestjs/common';
import { AggregatorService } from '../aggregator/aggregator.service';

@Injectable()
export class GatewayService {
  constructor(private readonly aggregatorService: AggregatorService) {}

  getHello() {
    return this.aggregatorService.getCoinsData();
  }
}
