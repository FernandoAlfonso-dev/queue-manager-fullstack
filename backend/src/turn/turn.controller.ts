import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { TurnService } from './turn.service';
import { NumberOrStringPipe } from 'src/common/pipe/numberOrString.pipe';
import { IdIntDto } from 'src/common/dto/id.dto';

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

  @Delete('/reset')
  @HttpCode(204)
  removeAll() {
    return this.turnService.removeAll();
  }

  @Get(':id')
  findOne(@Param('id', new NumberOrStringPipe()) id: string | number) {
    return this.turnService.findOne(id);
  }


  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: IdIntDto) {
    return this.turnService.remove(id);
  }
}
