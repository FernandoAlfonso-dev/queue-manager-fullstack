import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module, Turn } from '@prisma/client';
import { findOrThrow } from 'src/common/util/findOrThrow.util';
import { TurnModuleInteface } from './interfaces/turnModule.interface';
import { TurnService } from 'src/turn/turn.service';

// This service manages the module functionality, allowing for creation, retrieval, updating, and deletion of modules.
// It also handles the association between modules and turns, allowing for switching turns associated with a module
@Injectable()
export class ModuleService {

  // Injecting PrismaService to interact with the database and TurnService to manage turns
  // The ModuleService provides methods to create, find, update, and delete modules, as well as to switch turns associated with a module.
  // It also includes methods to find a module by its ID or name and to find all modules with their associated turns.
  // The findOrThrowModule method is used to retrieve a module by its ID or name, throwing an error if not found.
  // The findTurnForSwitch method retrieves the next available turn for switching, ensuring that the module can always have an active turn associated with it.
  // The create method allows for creating a new module with an optional name, defaulting to a generated name if not provided.
  // The switchTurn method handles the logic for switching the turn associated with a module, ensuring that the used status of turns is managed correctly.
  // The findAllWithTurn method retrieves all modules with their associated turns, while the removeAllWithTurn method deletes all module-turn associations.
  // The removeAll method deletes all modules from the database.
  constructor(
    private readonly prisma: PrismaService,
    private readonly turnService: TurnService
  ) { }

  /**
   * Finds a module by its ID or name, throwing an error if not found.
   * @param id - The ID or name of the module to search for.
   * @param message - Optional custom error message if the module is not found.
   * @returns A promise that resolves to the found Module object.
   */
  private findOrThrowModule({
    id,
    message,
  }: { id: number | string, message?: string }): Promise<Module> {

    const message_not_found = `Not found module by id - ${id} -`;
    const key = typeof id === 'number' ? 'id' : 'name';

    return findOrThrow<Module>({
      finder: () => this.prisma.module.findFirst({
        where: { [key]: id }
      }),
      message: message || message_not_found
    })
  }

  /**
   * Finds the next available turn for switching, ensuring that the module can always have an active turn associated with it.
   * @returns A promise that resolves to the next available Turn object.
   * @throws NotFoundException if no turns are found to switch.
   */
  private async findTurnForSwitch(): Promise<Turn> {
    const turns = await this.prisma.turn.findMany({
      where: { used: false },
      orderBy: { createAt: 'asc' },
      take: 1,
    });

    if (turns.length === 0) {
      throw new NotFoundException('No turns found to switch.');
    }

    return turns[0];
  }

  /**
  * Creates a new module in the database.
  * If no name is provided, it automatically generates one using the format "MOD-{n}".
  *
  * @param createModuleDto - Data Transfer Object containing the module creation details.
  * @returns The newly created module object.
  */
  async create(createModuleDto: CreateModuleDto) {

    const count = await this.prisma.module.count();
    const payload = {
      name: createModuleDto.name || `MOD-${count + 1}`,
    }
    return this.prisma.module.create({
      data: payload,
    });
  }

  /**
  * Retrieves all modules from the database.
  *
  * @returns A promise that resolves to an array of all module objects.
  */
  findAll() {
    return this.prisma.module.findMany();
  }

  /**
   * Finds a module by its ID or name, returning the Module object if found.
   * @param id - The ID or name of the module to search for.
   * @returns A promise that resolves to the found Module object.
   */
  findOne(id: number | string) {
    return this.findOrThrowModule({
      id
    });
  }

  /**
 * Updates an existing module by its ID.
 * Uses `findOrThrowModule` to ensure the module exists before updating.
 *
 * @param id - The numeric ID of the module to update.
 * @param updateModuleDto - Data Transfer Object containing the update details.
 * @returns A promise that resolves to the updated `Module` object.
 * @throws NotFoundException if the module does not exist.
 */
  async update(id: number, updateModuleDto: UpdateModuleDto) {

    const module_found = await this.findOrThrowModule({ id });

    return this.prisma.module.update({
      where: { id: module_found.id },
      data: updateModuleDto,
    });
  }

  /**
 * Deletes a module by its ID.
 * Uses `findOrThrowModule` to ensure the module exists before deletion.
 *
 * @param id - The numeric ID of the module to delete.
 * @returns A promise that resolves to the deleted `Module` object.
 * @throws NotFoundException if the module does not exist.
 */
  async remove(id: number) {
    const module_found = await this.findOrThrowModule({ id });

    return this.prisma.module.delete({
      where: { id: module_found.id }
    });
  }

  /**
 * Switches the turn associated with a specific module.
 * Ensures that the module exists and retrieves the next available turn
 * to be assigned to it. If the module already has an associated turn,
 * it will be replaced with the new one, updating the "used" status accordingly.
 *
 * @param id - The ID of the module whose turn is being switched.
 * @returns A promise that resolves to the newly created TurnModule association.
 * @throws NotFoundException - If the module with the given ID does not exist.
 */
  async switchTurn(id: number) {

    await this.findOrThrowModule({ id });
    const nextTurn = await this.findTurnForSwitch();

    const relation_module_turn = await this.prisma.turnModule.findFirst({
      where: { moduleId: id },
      include: { turn: true, module: true }
    });

    const payload_new_turn: TurnModuleInteface = {
      moduleId: id,
      turnId: nextTurn.id
    }

    if (!relation_module_turn) {

      await this.turnService.switchUsed(nextTurn.id, true);

      return this.prisma.turnModule.create({
        data: payload_new_turn
      });
    }

    await this.turnService.switchUsed(relation_module_turn.turnId, true);
    await this.turnService.switchUsed(nextTurn.id, true);

    await this.prisma.turnModule.deleteMany({
      where: {
        moduleId: id,
        turnId: relation_module_turn.turnId
      }
    });

    return this.prisma.turnModule.create({
      data: payload_new_turn
    });
  }

  /**
   * Retrieves all modules with their associated turns from the database.
   *
   * @returns A promise that resolves to an array of objects, 
   * each containing a module and its associated turn.
   */
  findAllWithTurn() {
    return this.prisma.turnModule.findMany({
      include: {
        turn: true,
        module: true
      }
    });
  }

  /**
  * Deletes all module-turn associations from the database.
  *
  * @returns A promise that resolves to the result of the delete operation,
  * including the count of deleted records.
  */
  removeAllWithTurn() {
    return this.prisma.turnModule.deleteMany();
  }

  /**
   * Deletes all modules from the database.
   * This operation removes every record in the `module` table.
   *
   * @returns A promise that resolves to the result of the deletion operation.
   */
  removeAll() {
    return this.prisma.module.deleteMany();

  }
}