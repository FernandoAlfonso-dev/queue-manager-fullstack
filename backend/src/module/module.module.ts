import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService],
  imports: [PrismaModule],
})
export class ModuleModule {}
