import { Component } from '@angular/core';
import { FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup } from '@angular/forms';
import { PageHeader } from '@shared';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { ExameInterface, ExameService } from 'apps/med-frontend/src/services/exame.service';
@Component({
  selector: 'app-exames-editarExames',
  imports: [PageHeader, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-exames.html',
  styleUrl: './editar-exames.css'
})
export class ExamesEditarExames {
registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}
  loading = false;
  exameId: number = 0;
  exame:ExameInterface = {} as ExameInterface;

  async ngOnInit() {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.exameId = parseInt(id);

    this.registerForm = this.fb.nonNullable.group(
      {
        laudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3000)]],
        detalhes: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
        usuarioId: ['', [Validators.required]],
        pacienteId: ['', [Validators.required]],
      },
    );

    const result = await ExameService.buscarExamePorId(this.exameId) as any;
    this.exame = result.message;
    if(result.message === null) {
      this.router.navigate(['404']);
    }
    if(result.status === 'success') {
      this.registerForm.setValue({
        pacienteId: result.message.paciente.id,
        usuarioId: 1,
        laudo: this.exame.laudo,
        detalhes: this.exame.detalhes,
      });
      this.registerForm.patchValue(result.message);
    }
  }

  async atualizar(){
  if (this.registerForm.valid) {
        this.loading = true;
        console.log('loading start', this.loading);
        const result = await ExameService.atualizarExame({...this.registerForm.value, id:this.exame.id}) as any;
        if(result.status === 'success') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Sucesso ao cadastrar exame!',
            icon: 'success',
          });
          this.router.navigate([`/exames/listarExames/${this.exame.pacienteId}`]);
        }
        else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Erro ao atualizar exame!',
            icon: 'error',
          });
        }
        this.loading = false;
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
