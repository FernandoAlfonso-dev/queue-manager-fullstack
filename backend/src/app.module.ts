import { Module } from '@nestjs/common';
import { ModuleModule } from './module/module.module';
import { TurnModule } from './turn/turn.module';

@Module({
  imports: [ModuleModule, TurnModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
