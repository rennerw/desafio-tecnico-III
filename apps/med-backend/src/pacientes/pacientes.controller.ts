import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { ReturnMessage } from '../libs/return-message.interface';
import { GetPacienteDto } from './dto/get-paciente.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) { }

  @Post()
  async create(@Body() createPacienteDto: CreatePacienteDto): Promise<ReturnMessage> {
    try {
      const result = await this.pacientesService.create(createPacienteDto);
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
        message: 'Erro ao criar paciente',
      } as ReturnMessage;
    }
  }

  @Get()
  async findAll(@Query() getPacienteDto: GetPacienteDto) {
    try {
      const result = await this.pacientesService.findAll(getPacienteDto);
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
        message: 'Erro ao buscar pacientes',
      } as ReturnMessage;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.pacientesService.findOne(+id);
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
        message: 'Erro ao buscar paciente',
      } as ReturnMessage;
    }

    
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    try {
      const result = await this.pacientesService.update(+id, updatePacienteDto);
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
      const result = await this.pacientesService.remove(+id);
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
        message: 'Erro ao remover paciente',
      } as ReturnMessage;
    }

  }
}
