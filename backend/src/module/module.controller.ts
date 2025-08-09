import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { NumberOrStringPipe } from 'src/common/pipe/numberOrString.pipe';
import { IdIntDto } from 'src/common/dto/id.dto';

/**
 * Controller responsible for handling HTTP requests related to modules.
 *
 * Delegates all business logic to `ModuleService`.
 * Provides endpoints for:
 * - Creating modules
 * - Retrieving all modules or a specific module by ID or name
 * - Updating modules
 * - Deleting modules
 * - Switching the turn associated with a module
 * - Retrieving modules with their associated turns
 */
@Controller('module')
export class ModuleController {

  // Injecting ModuleService to handle module-related operations
  // It provides methods to create a new module, find all modules, find a module by its ID or name, update a module, delete a module, switch the turn associated with a module, and find all modules with their associated turns.
  // The controller also includes methods to remove all module-turn associations and to delete all modules.
  constructor(private readonly moduleService: ModuleService) { }

  // POST /module
  // Creates a new module with the provided data.
  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  // GET /module
  // Retrieves all modules from the database.
  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  // GET /module/withTurn
  // Retrieves all modules along with their associated turns.
  @Get('withTurn')
  findAllWithTurn() {
    return this.moduleService.findAllWithTurn();
  }

  // DELETE /module/withTurn/reset
  // Deletes all module-turn associations from the database.
  @Delete('withTurn/reset')
  @HttpCode(204)
  removeAllWithTurn() {
    return this.moduleService.removeAllWithTurn()
  }


  // POST /module/switchTurn/:id
  // Switches the turn associated with a module by its ID.
  @Post('switchTurn/:id')
  switchTurn(@Param() { id }: IdIntDto) {
    return this.moduleService.switchTurn(id);
  }


  // DELETE /module/reset
  // Deletes all modules from the database.
  @Delete('reset')
  @HttpCode(204)
  removeAll() {
    return this.moduleService.removeAll();
  }


  // GET /module/:id
  // Retrieves a module by its ID or name.
  @Get(':id')
  findOne(@Param('id', new NumberOrStringPipe()) id: string | number) {
    return this.moduleService.findOne(id);
  }

  // PATCH /module/:id
  // Updates a module by its numeric ID with the provided data.
  @Patch(':id')
  update(@Param() { id }: IdIntDto, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(id, updateModuleDto);
  }

  // DELETE /module/:id
  // Deletes a module by its numeric ID.
  // Returns a 204 No Content response on successful deletion.
  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: IdIntDto) {
    return this.moduleService.remove(id);
  }
}