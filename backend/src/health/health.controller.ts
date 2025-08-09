import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) { }

  // GET /health
  // Endpoint to check the connection to the database
  @Get()
  checkHealth() {
    return this.healthService.checkHealth()
  }

}
