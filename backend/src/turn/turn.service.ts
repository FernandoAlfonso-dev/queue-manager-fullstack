import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { findOrThrow } from 'src/common/util/findOrThrow.util';
import { Turn } from '@prisma/client';

// This service manages the turn functionality, allowing for creation, retrieval, updating, and deletion of turns.
// It provides methods to switch the used status of a turn and to find turns by their ID or turn number.
@Injectable()
export class TurnService {

  // Injecting PrismaService to interact with the database
  constructor(readonly prisma: PrismaService) { }

  /**
   * Finds a turn by its ID or turn number, throwing an error if not found.
   * @param id - The ID or turn number to search for.
   * @param message - Optional custom error message if the turn is not found.
   * @returns A promise that resolves to the found Turn object.
   */
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

  /**
 * Creates a new module with the provided details.
 * 
 * @param createModuleDto - Data Transfer Object containing the module creation details.
 * @returns The newly created module object.
 */
  async create() {
    const count = await this.prisma.turn.count();

    const payload = {
      turn: `TRN-${count + 1}`
    }

    return this.prisma.turn.create({ data: payload })
  }

  /**
   * Updates the used status of a turn by its ID.
   * If no used status is provided, it toggles the current used status.
   * @param id - The ID of the turn to update.
   * @param used - Optional boolean to set the used status.
   * @returns A promise that resolves to the updated Turn object.
   */
  async switchUsed(id: number, used?: boolean) {

    const turn_found = await this.findOrThrowTurn({ id });

    return this.prisma.turn.update({
      where: { id },
      data: { used: used ?? (turn_found.used ? false : true) }
    });
  }

  /**
  * Finds all turns, optionally filtered by used status.
  * @param used - Boolean to filter by used status (optional).
  * @returns Promise with an array of Turn objects.
  */
  findAll(used?: boolean) {
    return this.prisma.turn.findMany({
      where: { used: used === undefined ? undefined : used },
    });
  }

  /**
   * Finds a turn by its ID or turn number.
   * @param id - The ID or turn number to search for.
   * @returns A promise that resolves to the found Turn object.
   */
  findOne(id: number | string) {
    return this.findOrThrowTurn({
      id
    });
  }

  /**
   * Deletes a turn by its ID.
   * @param id - The ID of the turn to delete.
   * @returns A promise that resolves to the deleted Turn object.
   */
  async remove(id: number) {

    const turn_found = await this.findOrThrowTurn({
      id
    });

    return this.prisma.turn.delete({
      where: { id: turn_found.id }
    });
  }

  /**
   * Deletes all turns from the database.
   * @returns A promise that resolves to the result of the delete operation.
   */
  removeAll() {
    return this.prisma.turn.deleteMany()
  }
}
