import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { ShedulerModule } from './sheduler/sheduler.module';
import { AggregatorModule } from './aggregator/aggregator.module';

@Module({
  imports: [GatewayModule, ShedulerModule, AggregatorModule],
})
export class AppModule {}
