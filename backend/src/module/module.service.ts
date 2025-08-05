import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@prisma/client';
import { findOrThrow } from 'src/common/util/findOrThrow.util';

@Injectable()
export class ModuleService {

  constructor(private readonly prisma: PrismaService) { }

  private findOrThrowModule({
    id,
    message
  }: { id: number | string, message?: string }): Promise<Module> {

    const message_not_found = `Not found by id - ${id} -`;
    const key = typeof id === 'number' ? 'id' : 'name';

    return findOrThrow<Module>({
      finder: () => this.prisma.module.findFirst({
        where: { [key]: id }
      }),
      message: message || message_not_found
    })
  }

  async create(createModuleDto: CreateModuleDto) {

    const count = await this.prisma.module.count();
    const payload = {
      name: createModuleDto.name || `MOD-${count + 1}`,
    }
    return this.prisma.module.create({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.module.findMany();
  }

  findOne(id: number | string) {
    return this.findOrThrowModule({
      id
    });
  }

  async update(id: number, updateModuleDto: UpdateModuleDto) {

    const module_found = await this.findOrThrowModule({ id });

    return this.prisma.module.update({
      where: { id: module_found.id },
      data: updateModuleDto,
    });

  }

  async remove(id: number) {

    const module_found = await this.findOrThrowModule({ id });

    return this.prisma.module.delete({
      where: { id: module_found.id }
    });
  }


  removeAll() {
    return this.prisma.module.deleteMany({});
  }
}
