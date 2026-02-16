import { PageHeader } from '@shared';
import { Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule, MatTable} from '@angular/material/table';
import { PacienteInterface, PacienteService } from 'apps/med-frontend/src/services/paciente.service';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes-listarPacientes',
  imports: [PageHeader, MatTableModule, MatPaginatorModule, MatTable, MatIcon, MatCardModule],
  templateUrl: './listar-pacientes.html',
  styleUrl: './listar-pacientes.css'
})
export class PacientesListarPacientes {
  constructor(private router: Router) {}
  displayedColumns: string[] = ['id', 'nome', 'email', 'endereco', 'tel1','exames','acoes'];
  totalRegistros = 0;
  pacientes: PacienteInterface[] = [];

  dataSource = new MatTableDataSource<PacienteInterface>(this.pacientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<PacienteInterface>;

  ngAfterViewInit() {
    
      PacienteService.buscarPacientes(1, this.paginator.pageSize).then(pacientes => {
        this.pacientes = pacientes.message.data as PacienteInterface[];
        this.dataSource.data = this.pacientes;
        this.paginator.length = pacientes.message.meta.total;
        this.totalRegistros = this.paginator.length;
        this.dataSource.paginator = this.paginator;
      });
  }

  trocarPagina(event: any) {
    
    PacienteService.buscarPacientes(event.pageIndex + 1, event.pageSize).then(pacientes => {
      this.pacientes = pacientes.message.data as PacienteInterface[];
      this.dataSource.data = this.pacientes;
      this.totalRegistros = pacientes.message.meta.total;
      this.dataSource.paginator = null;
    });
  }

  
  adicionarExame(element: PacienteInterface) {
    this.router.navigate(['exames/cadastrar', element.id]);
  }

  listarExames(element: PacienteInterface) {
    this.router.navigate(['exames/listarExames', element.id]);
  }

  adicionarPaciente() {
    this.router.navigate(['pacientes/cadastrar']);
  }

  editarPaciente(element: PacienteInterface) {
    this.router.navigate(['pacientes/editarPaciente', element.id]);
  }

  excluirPaciente(element: PacienteInterface) {
      Swal.fire({
        title: "Você tem certeza?",
        text: "Você está prestes a excluir o paciente " + element.nome + "!",
        showConfirmButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonAriaLabel: 'Excluir',
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const excluirPaciente = await PacienteService.excluirPaciente(element.id) as any;
          console.log(excluirPaciente);
          if( excluirPaciente.status === 'success'){

            this.dataSource.data = this.dataSource.data.filter(p => p.id !== element.id);
            this.totalRegistros--;

            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                title: 'Sucesso ao excluir paciente!',
                icon: 'success',
              });
              
          }
          else{
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                title: 'Erro ao excluir paciente!',
                icon: 'error',
              });
          }
        }
      });
  }
}

