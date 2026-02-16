import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamesService } from './exames.service';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
import { ReturnMessage } from '../libs/return-message.interface';

@Controller('exames')
export class ExamesController {
  constructor(private readonly examesService: ExamesService) {}

  @Post()
  async create(@Body() createExameDto: CreateExameDto): Promise<ReturnMessage> {
    try {
      const result = await this.examesService.create(createExameDto);
      return {
        httpCode: 200,
        status: 'success',
        message: result,
      } as ReturnMessage;
    }
    catch (e) {
      console.error(e);
      return {
        httpCode: 500,
        status: 'error',
        message: 'Erro ao criar exame',
      } as ReturnMessage;
    }
  }

  @Get("/paciente/:pacienteId")
  async findAll(@Param('pacienteId') pacienteId: number) {
    try {
      const result = await this.examesService.findAll(pacienteId);
      return {
        httpCode: 200,
        status: 'success',
        message: { data: result },
      } as ReturnMessage;
    }
    catch (e) {
      console.error(e);
      return {
        httpCode: 500,
        status: 'error',
        message: 'Erro ao criar exame',
      } as ReturnMessage;
    }
    
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnMessage> {
    try {
      const result = await this.examesService.findOne(+id);
      return {
        httpCode: 200,
        status: 'success',
        message: result,
      } as ReturnMessage;
    }
    catch (e) {
      console.error(e);
      return {
        httpCode: 500,
        status: 'error',
        message: 'Erro ao buscar exame',
      } as ReturnMessage;
    }

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExameDto: UpdateExameDto) {
    try {
      const result = await this.examesService.update(+id, updateExameDto);
      return {
        httpCode: 200,
        status: 'success',
        message: result,
      } as ReturnMessage;
    }
    catch (e) {
      console.error(e);
      return {
        httpCode: 500,
        status: 'error',
        message: 'Erro ao atualizar paciente',
      } as ReturnMessage;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.examesService.remove(+id);
      return {
        httpCode: 200,
        status: 'success',
        message: result,
      } as ReturnMessage;
    }
    catch (e) {
      console.error(e);
      return {
        httpCode: 500,
        status: 'error',
        message: 'Erro ao atualizar paciente',
      } as ReturnMessage;
    }
  }
}
