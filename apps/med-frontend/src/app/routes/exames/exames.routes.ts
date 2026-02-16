import { Routes } from '@angular/router';
import { ExamesNovoExame } from './novo-exame/novo-exame';
import { ExamesListarExames } from './listar-exames/listar-exames';
import { ExamesEditarExames } from './editar-exames/editar-exames';

export const routes: Routes = [
    { path: 'cadastrar/:pacienteId', component: ExamesNovoExame },
    { path: 'listarExames/:pacienteId', component: ExamesListarExames },
    { path: 'editarExame/:id', component: ExamesEditarExames }
];
