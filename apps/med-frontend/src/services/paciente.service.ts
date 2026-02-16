import { environment } from "@env/environment";
//import { CreatePacienteDto } from "../../../med-backend/src/pacientes/dto/create-paciente.dto";

export interface PacienteInterface {
    id: number;
    nome: string;
    email: string;
    documento: string;
    endereco: string;
    tel1: string;
    tel2: string;
    dataCriacao: string;
    dataAtualizacao: string;
}

export class PacienteService {

  static async cadastrarPaciente(paciente: Object): Promise<Object> {
    try {
      const response = await fetch(`${environment.apiUrl}/pacientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
      });
      const data = await response.json();
      //if(data.staus)
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async atualizarPaciente(paciente: Partial<PacienteInterface>): Promise<Object> {
    try {
      const response = await fetch(`${environment.apiUrl}/pacientes/${paciente.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async buscarPacientes(page: number, pageSize: number): Promise<any> {
    try {
      const response = await fetch(`${environment.apiUrl}/pacientes?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  static async buscarPacientePorId(id: number): Promise<any> {
    try {
      const response = await fetch(`${environment.apiUrl}/pacientes/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async excluirPaciente(id: number): Promise<any> {
    try {
      const response = await fetch(`${environment.apiUrl}/pacientes/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

}