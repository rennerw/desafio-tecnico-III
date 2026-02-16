import { environment } from "@env/environment";
//import { CreatePacienteDto } from "../../../med-backend/src/pacientes/dto/create-paciente.dto";

export interface ExameInterface {
    id: number;
    laudo: string;
    detalhes: string;
    usuarioId: number;
    pacienteId: number;
    usuario?: any;
    paciente?: any;
    dataCriacao: string;
    dataAtualizacao: string;
}

export class ExameService {

  static async cadastrarExame(exame: Object): Promise<Object> {
    try {
      const response = await fetch(`${environment.apiUrl}/exames`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exame)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async atualizarExame(exame: Partial<ExameInterface>): Promise<Object> {
      try {
        const response = await fetch(`${environment.apiUrl}/exames/${exame.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(exame)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    static async buscarExames(pacienteId: number): Promise<any> {
      try {
        const response = await fetch(`${environment.apiUrl}/exames/paciente/${pacienteId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    static async buscarExamePorId(exameId: number): Promise<any> {
      try {
        const response = await fetch(`${environment.apiUrl}/exames/${exameId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  
    static async excluirExame(exameId: number): Promise<any> {
      try {
        const response = await fetch(`${environment.apiUrl}/exames/${exameId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

}