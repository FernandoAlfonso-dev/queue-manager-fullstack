import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthService {

    constructor(private readonly prisma: PrismaService) { }

    async checkHealth() {
        try {
            await this.prisma.$queryRaw`SELECT 1 as result`;
            return { status: 'ok' };
        } catch {
            return {
                status: 'error',
                error: 'Database connection failed'
            }
        }
    }
}
