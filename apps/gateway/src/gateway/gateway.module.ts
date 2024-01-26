import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { BinanceModule } from '@app/scrapers/binance/binance.module';

@Module({
  imports: [BinanceModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
