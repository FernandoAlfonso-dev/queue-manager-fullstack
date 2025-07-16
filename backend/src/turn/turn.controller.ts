import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { TurnService } from './turn.service';
import { IdStringDto } from 'src/common/dto/id.dto';
import { NumberOrStringPipe } from 'src/common/pipe/numberOrString.pipe';

@Controller('turn')
export class TurnController {
  constructor(private readonly turnService: TurnService) { }

  @Post()
  create() {
    return this.turnService.create();
  }

  @Get()
  findAll() {
    return this.turnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new NumberOrStringPipe()) id: string | number) {
    console.log(typeof id)
    return this.turnService.findOne(id);
  }

  @Delete('/reset')
  @HttpCode(204)
  removeAll() {
    return this.turnService.removeAll();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new NumberOrStringPipe()) id: string | number) {
    return this.turnService.remove(id);
  }
}
