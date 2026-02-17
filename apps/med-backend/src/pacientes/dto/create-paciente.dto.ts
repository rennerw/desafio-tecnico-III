import { IsEmail, IsString, Length, IsEmpty, IsOptional, ValidatorConstraint, ValidationArguments, ValidatorConstraintInterface, Validate } from 'class-validator';

@ValidatorConstraint({ name: 'isValidCPF', async: false })
export class isValidCPF implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    var Soma = 0
    var Resto
    var strCPF = String(cpf).replace(/[^\d]/g, '')

    if (strCPF.length !== 11)
        return false    
    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
        ].indexOf(strCPF) !== -1)
        return false
    for (var i=1; i<=9; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) 
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10)) )
        return false
    
    Soma = 0

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) 
        Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return false

    return true

  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF ($value) é inválido!';
  }
}

export class CreatePacienteDto {

    @IsString()
    @Length(3, 191)
    nome!: string;

    @Validate(isValidCPF)
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
