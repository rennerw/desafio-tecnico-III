import { Routes } from '@angular/router';
import { PacientesNovoPaciente } from './novo-paciente/novo-paciente';
import { PacientesListarPacientes } from './listar-pacientes/listar-pacientes';
import { PacientesEditarPaciente } from './editar-paciente/editar-paciente';

export const routes: Routes = [
    { path: 'cadastrar', component: PacientesNovoPaciente, data: { title: 'Cadastrar Paciente' } }, 
    { path: 'listarPacientes', component: PacientesListarPacientes, data: { title: 'Listar Pacientes'} },
    { path: 'editarPaciente/:id', component: PacientesEditarPaciente, data: { title: 'Editar Paciente', key: 'editarPaciente'} },
];
