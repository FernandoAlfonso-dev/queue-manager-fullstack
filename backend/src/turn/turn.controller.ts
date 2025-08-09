import { Controller, Get, Post, Param, Delete, HttpCode, Patch, Query, BadRequestException } from '@nestjs/common';
import { TurnService } from './turn.service';
import { NumberOrStringPipe } from 'src/common/pipe/numberOrString.pipe';
import { IdIntDto } from 'src/common/dto/id.dto';

/**
 * Controller responsible for handling HTTP requests related to turns.
 *
 * Delegates business logic to `TurnService`.
 * Provides endpoints for:
 * - Creating turns
 * - Retrieving turns (optionally filtered by `used` status)
 * - Switching the `used` status of a turn
 * - Deleting all turns or a specific turn
 * - Retrieving a specific turn by ID or name
 */
@Controller('turn')
export class TurnController {

  /**
 * Controller responsible for handling HTTP requests related to turns.
 *
 * Injects `TurnService` to perform turn-related operations, including:
 * - Creating a new turn
 * - Retrieving all turns (optionally filtered by `used` status)
 * - Switching the `used` status of a turn
 * - Removing turns (all or by ID)
 * - Retrieving a turn by its ID or turn number
 *
 * The `parseUsedQuery` method is used internally to parse and validate
 * the `used` query parameter, converting it to a boolean or throwing an
 * error if the value is invalid.
 *
 * The controller uses `IdIntDto` to validate numeric ID parameters for
 * turn operations.
 */
  constructor(private readonly turnService: TurnService) { }

  /**
 * Parses the `used` query parameter from the request, converting it to a boolean.
 *
 * - If the value is `'true'`, returns `true`.
 * - If the value is `'false'`, returns `false`.
 * - If the value is `undefined`, returns `undefined`.
 *
 * Throws a `BadRequestException` if the value is not `'true'`, `'false'`, or `undefined`.
 * This method is typically used to filter turns based on their `used` status
 * when retrieving them from the database.
 *
 * @param value - The `used` query parameter as a string or undefined.
 * @returns A boolean representing the parsed value, or `undefined` if not provided.
 * @throws BadRequestException if the value is invalid.
 */
  private parseUSedQuery(value: string | undefined): boolean | undefined {
    if (value === undefined) {
      return undefined;
    }
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }

    throw new BadRequestException(`Invalid 'used' query parameter: ${value}. Expected 'true', 'false'.`);
  }

  // POST /module
  // Handles the creation of a new module using the provided data.
  // Accepts a CreateModuleDto in the request body and passes it to the ModuleService.
  // Returns the newly created module object.
  @Post()
  create() {
    return this.turnService.create();
  }

  // GET /turn
  // Retrieves all turns, optionally filtered by 'used' status.
  @Get()
  findAll(@Query('used') used?: string) {
    const parsedUsed = this.parseUSedQuery(used);
    return this.turnService.findAll(parsedUsed);
  }

  // PATCH /turn/switchUsed/:id
  // Switches the 'used' status of a turn identified by its ID.
  @Patch('switchUsed/:id')
  switchUsed(
    @Param() { id }: IdIntDto,
    @Query('used') used?: string
  ) {
    const parsedUsed = this.parseUSedQuery(used);
    return this.turnService.switchUsed(id, parsedUsed);
  }

  // DELETE /turn/reset
  // Deletes all turns from the database.
  // Returns a 204 No Content response if successful.
  @Delete('reset')
  @HttpCode(204)
  removeAll() {
    return this.turnService.removeAll();
  }

  // GET /turn/:id
  // Retrieves a specific turn by its ID or turn number.
  @Get(':id')
  findOne(@Param('id', new NumberOrStringPipe()) id: string | number) {
    return this.turnService.findOne(id);
  }

  // DELETE /turn/:id
  // Deletes a specific turn identified by its ID.
  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: IdIntDto) {
    return this.turnService.remove(id);
  }
}
