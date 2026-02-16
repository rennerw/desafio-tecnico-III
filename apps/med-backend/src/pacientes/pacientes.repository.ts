import { Prisma } from '@org/prisma-client';
import { PrismaService } from '../app/prisma/prisma.service';
import { PaginatedPacienteDto } from './dto/paginated-paciente.output.dto';
import { Paciente } from './entities/paciente.entity';
import { createPaginator } from 'prisma-pagination';



//const paginate:
export default class PacientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, pageSize: number): Promise<PaginatedPacienteDto<Paciente>> {
    const paginate = createPaginator({ perPage: pageSize });
    
    return paginate<Paciente, Prisma.PacienteFindManyArgs>(this.prisma.paciente, 
    {
      where: {},
      orderBy: {
        dataCriacao: 'desc',
      }
    },
    {
        page: page,
    }
    );
  }

}