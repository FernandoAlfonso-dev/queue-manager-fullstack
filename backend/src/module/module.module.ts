import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TurnModule } from 'src/turn/turn.module';

/**
 * The `ModuleModule` bundles all functionality related to modules.
 * 
 * - **Controllers**: `ModuleController` — handles incoming HTTP requests related to modules.
 * - **Providers**: `ModuleService` — contains the business logic for managing modules.
 * - **Imports**:
 *   - `PrismaModule` — for database access via Prisma.
 *   - `TurnModule` — for managing turns associated with modules.
 */
@Module({
  controllers: [ModuleController],
  providers: [ModuleService],
  imports: [PrismaModule, TurnModule],
})
export class ModuleModule { }
