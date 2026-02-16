import { IsOptional, IsPositive, Min } from 'class-validator';

export class GetPacienteDto {

    @IsOptional()
    @IsPositive()
    page?: number;

    @IsOptional()
    @Min(0)
    pageSize?: number;
}
