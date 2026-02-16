import { Module } from '@nestjs/common';
import { ExamesService } from './exames.service';
import { ExamesController } from './exames.controller';
import { PrismaModule } from '../app/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExamesController],
  providers: [ExamesService],
})
export class ExamesModule {}
