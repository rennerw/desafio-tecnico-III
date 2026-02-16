import { Component } from '@angular/core';
import { PageHeader } from '@shared';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule, MatTable } from '@angular/material/table';
import { ExameInterface, ExameService } from 'apps/med-frontend/src/services/exame.service';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-exames-listarExames',
  imports: [PageHeader, MatTableModule, MatPaginatorModule, MatIcon, MatTable, MatTableModule, MatCardModule, DatePipe],
  templateUrl: './listar-exames.html',
  styleUrl: './listar-exames.css'
})
export class ExamesListarExames {
    constructor(private router: Router) {}
    displayedColumns: string[] = ['id', 'nome', 'email', 'tel1', 'criado','atualizado','acoes'];
    pacienteId: number = 0;
    exames: ExameInterface[] = [];
  
    dataSource = [] as ExameInterface[];

    ngOnInit() {
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf('/') + 1);
      this.pacienteId = parseInt(id);
    }
  
    async ngAfterViewInit() {
        
        await ExameService.buscarExames(this.pacienteId).then(exames => {
          this.exames = exames.message.data as ExameInterface[];
          this.dataSource = this.exames;  
        });
    }

    editarExame(element: ExameInterface) {
        this.router.navigate(['exames/editarExame', element.id]);
      }
    
    adicionarExame() {
      this.router.navigate(['exames/cadastrar', this.pacienteId]);
    }
    
    excluirExame(element: ExameInterface, item: MouseEvent) {
        const btn = item.currentTarget as HTMLElement;
        Swal.fire({
          title: "Você tem certeza?",
          text: "Você está prestes a excluir o exame do paciente " + element.paciente.nome + "!",
          showConfirmButton: true,
          confirmButtonColor: '#dc3545',
          confirmButtonAriaLabel: 'Excluir',
          showCancelButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
            const excluirExame = await ExameService.excluirExame(element.id) as any;
            console.log(excluirExame);
            if( excluirExame.status === 'success'){
  
              btn.closest('tr')?.remove();
              this.dataSource = this.dataSource.filter(p => p.id !== element.id);

              Swal.fire({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 1500,
                  title: 'Sucesso ao excluir exame!',
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
