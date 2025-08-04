import { Module } from '@nestjs/common';
import { ModuleModule } from './module/module.module';
import { TurnModule } from './turn/turn.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ModuleModule, TurnModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
