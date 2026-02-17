import { plainToInstance } from 'class-transformer';
import { validate } from "class-validator";
import { 
  BadRequestException, 
  ConflictException, 
  InternalServerErrorException 
} from '@nestjs/common';

export class ErroValidacao extends BadRequestException {
  constructor(message: string) {
    super({
        message,
        status: 'fail',
        httpCode: 400,
    });
  }
}

export class ErroConflito extends ConflictException {
  constructor(message: string) {
    super({
        message,
        status: 'fail',
        httpCode: 409,
    });
  }
}

export class ErroInterno extends InternalServerErrorException {
  constructor(message: string) {
    super({
        message,
        status: 'error',
        httpCode: 500,
    });
    }
}

export async function validar(dto: any, data: any): Promise<ErroValidacao|null> {
    const object = plainToInstance(dto, data);
    const errors = await validate(object);

    console.log('Validation errors: ', errors);

    if(errors.length > 0) {
        throw new ErroValidacao('Erro de validação');
    }
    return null;
}