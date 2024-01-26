import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { ShedulerModule } from './sheduler/sheduler.module';

@Module({
  imports: [GatewayModule, ShedulerModule],
})
export class AppModule {}
