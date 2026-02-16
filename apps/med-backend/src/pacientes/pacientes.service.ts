import { Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma/prisma.service';
import { Prisma, Paciente } from '@org/prisma-client';
import { Paciente as PacienteEntity } from './entities/paciente.entity';
import { GetPacienteDto } from './dto/get-paciente.dto';
import PacientesRepository from './pacientes.repository';
import { PaginatedPacienteDto } from './dto/paginated-paciente.output.dto';

@Injectable()
export class PacientesService {

  constructor(private prisma: PrismaService) {

  }

  async create(data: Prisma.PacienteCreateInput): Promise<Paciente> {
    try{
      return await this.prisma.$transaction(async (prisma) => {
        const paciente = await prisma.paciente.create({
          data,
        });
        return paciente;
      }
      );
    }
    catch(e){
      console.error(e);
      return Promise.reject(e);
    }
  }

  async findAll(getPacienteDto?: GetPacienteDto): Promise<PaginatedPacienteDto<PacienteEntity>> {
    const { page = 1, pageSize = 10 } = getPacienteDto || {};

    const pacienteRepository = new PacientesRepository(this.prisma);

    const result = await pacienteRepository.findAll(page, pageSize);
    return result;
    
  }

  async findOne(id: number): Promise<Paciente | null> {
    return await this.prisma.paciente.findFirst({
      where: {
        id: id
      }
    })
  }

  async update(id: number, data: Prisma.PacienteUpdateInput): Promise<Paciente> {

    return await this.prisma.$transaction(async (prisma) => {
      const paciente = await prisma.paciente.update({
        where: { id: id },
        data,
      });
      return paciente;
    });
  }

  async remove(id: number): Promise<Paciente> {
    return await this.prisma.$transaction(async (prisma) => {
      const paciente = await prisma.paciente.delete({
        where: { id: id },
      });
      return paciente;
    });
  }
}
