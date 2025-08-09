import { Module } from '@nestjs/common';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

/**
 * NestJS module that encapsulates all turn-related functionality.
 *
 * Responsibilities:
 * - Provides `TurnService` for managing turn entities.
 * - Exposes `TurnController` to handle HTTP requests related to turns.
 * - Imports `PrismaModule` for database access.
 * - Exports `TurnService` for use in other modules.
 */

@Module({
  controllers: [TurnController],
  providers: [TurnService],
  exports: [TurnService],
  imports: [PrismaModule]
})
export class TurnModule { }
