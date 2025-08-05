import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { findOrThrow } from 'src/common/util/findOrThrow.util';
import { Turn } from '@prisma/client';

@Injectable()
export class TurnService {

  constructor(readonly prisma: PrismaService) { }

  private findOrThrowTurn({
    id,
    message
  }: { id: number | string, message?: string }): Promise<Turn> {

    const message_not_found = `Not found by id - ${id} -`;
    const key = typeof id === 'number' ? 'id' : 'turn';

    return findOrThrow<Turn>({
      finder: () => this.prisma.turn.findFirst({
        where: { [key]: id }
      }),
      message: message || message_not_found
    })
  }

  async create() {
    const count = await this.prisma.turn.count();
    const payload = {
      turn: `TRN-${count + 1}`
    }

    return this.prisma.turn.create({
      data: payload
    })
  }

  findAll() {
    return this.prisma.turn.findMany();
  }

  findOne(id: number | string) {
    return this.findOrThrowTurn({
      id
    });
  }

  async remove(id: number) {

    const turn_found = await this.findOrThrowTurn({
      id
    });

    return this.prisma.turn.delete({
      where: { id: turn_found.id }
    });
  }

  removeAll() {
    return this.prisma.turn.deleteMany()
  }
}
