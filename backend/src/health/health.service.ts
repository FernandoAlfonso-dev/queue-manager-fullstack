import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// HealthService is a service that checks the health of the application,
// specifically the database connection.    
@Injectable()
export class HealthService {

    // Injecting PrismaService to access the database
    // This service is used to perform database operations.
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Checks the health of the application by verifying the database connection.
     * @returns An object indicating the health status of the application.
     */
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
