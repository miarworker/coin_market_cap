import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AggregatorModule } from '../aggregator/aggregator.module';
import { JobsService } from './jobs.service';

@Module({
  imports: [ScheduleModule.forRoot(), AggregatorModule],
  providers: [JobsService],
})
export class ShedulerModule {}
