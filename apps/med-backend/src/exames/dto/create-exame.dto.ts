import { IsEmpty, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateExameDto {
    @IsString()
    @Length(3, 3000)
    laudo!: string;

    @IsString()
    @Length(3, 1000)
    detalhes!: string;

    @IsNumber()
    @IsNotEmpty()
    usuarioId!: number;
    
    @IsNumber()
    @IsNotEmpty()
    pacienteId!: number;

    usuario?: any;
    paciente?: any;

    @IsEmpty()
    dataCriacao!: string

    @IsEmpty()
    dataAtualizacao!: string
}
