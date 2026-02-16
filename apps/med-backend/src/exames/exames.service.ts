import { Injectable } from '@nestjs/common';
import { UpdateExameDto } from './dto/update-exame.dto';
import { PrismaService } from '../app/prisma/prisma.service';
import { Exame } from '@org/prisma-client';
import { Exame as ExameEntity } from './entities/exame.entity';
import { CreateExameDto } from './dto/create-exame.dto';
//import { GetPacienteDto } from './dto/get-paciente.dto';
//import PacientesRepository from './pacientes.repository';
//import { PaginatedExameDto } from './dto/paginated-exame.output.dto';

@Injectable()
export class ExamesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateExameDto): Promise<Exame> {
    try{
      return await this.prisma.$transaction(async (prisma) => {
        const exame = await prisma.exame.create({
          data,
        });
        return exame;
      }
      );
    }
    catch(e){
      console.error(e);
      return Promise.reject(e);
    }
  }

  async findAll(pacienteId: number): Promise<ExameEntity[]> {
    try{
      return await this.prisma.exame.findMany({
        where: {
          pacienteId: Number(pacienteId),
        },
        include: {
          paciente: true,
          usuario: true,
        },
      });
    }
    catch(e){
      console.error(e);
      return Promise.reject(e);
    }
  }

  async findOne(id: number): Promise<Exame | null> {
    return await this.prisma.exame.findFirst({
      where: {
        id: id
      },
      include: {
        paciente: true
      },
    })
  }

  async update(id: number, data: UpdateExameDto): Promise<Exame> {
     return await this.prisma.$transaction(async (prisma) => {
      const exame = await prisma.exame.update({
        where: { id: id },
        data,
      });
      return exame;
    });
  }

  async remove(id: number): Promise<Exame> {
    return await this.prisma.$transaction(async (prisma) => {
      const exame = await prisma.exame.delete({
        where: { id: id },
      });
      return exame;
    });
  }
}
