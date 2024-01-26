import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AggregatorModule } from '../aggregator/aggregator.module';

@Module({
  imports: [AggregatorModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
