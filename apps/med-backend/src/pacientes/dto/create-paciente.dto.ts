import { IsEmail, IsString, Length, IsEmpty, IsOptional } from 'class-validator';

export class CreatePacienteDto {

    @IsString()
    @Length(3, 191)
    nome!: string;

    @IsString()
    @Length(11)
    documento!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @Length(3, 191)
    endereco!: string;

    @IsString()
    @Length(10, 11)
    tel1!: string

    @IsString()
    @Length(10, 11)
    @IsOptional()
    tel2?: string

    @IsEmpty()
    dataCriacao!: string

    @IsEmpty()
    dataAtualizacao!: string
}
