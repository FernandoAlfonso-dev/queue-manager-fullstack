import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { NumberOrStringPipe } from 'src/common/pipe/numberOrString.pipe';
import { IdIntDto } from 'src/common/dto/id.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) { }

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  @Delete('/reset')
  @HttpCode(204)
  removeAll() {
    return this.moduleService.removeAll();
  }

  @Get(':id')
  findOne(@Param('id', new NumberOrStringPipe()) id: string | number) {
    return this.moduleService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdIntDto, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: IdIntDto) {
    return this.moduleService.remove(id);
  }

}
