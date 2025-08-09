import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

// HealthModule is a module that provides health check functionality for the application.
// It includes the HealthService and HealthController, and imports the PrismaModule for database access.
@Module({
  controllers: [HealthController],
  providers: [HealthService],
  imports: [PrismaModule],
})
export class HealthModule {}
