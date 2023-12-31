import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('healthz')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async checkHealth(): Promise<{ status: string }> {
    const isDatabaseConnected =
      await this.healthService.checkDatabaseConnection();
    if (isDatabaseConnected) {
      return { status: 'success' };
    } else {
      return { status: 'error' };
    }
  }
}
