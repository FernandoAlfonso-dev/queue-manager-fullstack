import { Module } from '@nestjs/common';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TurnController],
  providers: [TurnService],
  imports: [PrismaModule]
})
export class TurnModule { }
