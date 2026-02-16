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
import { TranslateModule } from '@ngx-translate/core';
import { PacienteService } from 'apps/med-frontend/src/services/paciente.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { ExameService } from 'apps/med-frontend/src/services/exame.service';

@Component({
  selector: 'app-exames-novoExame',
  imports: [PageHeader, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatFormFieldModule, MatInputModule, TranslateModule, MatProgressSpinnerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './novo-exame.html',
  styleUrl: './novo-exame.css'
})
export class ExamesNovoExame {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}
  loading = false;
  pacienteId: number = 0;

  async ngOnInit() {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.pacienteId = parseInt(id);

    this.registerForm = this.fb.nonNullable.group(
      {
        laudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3000)]],
        detalhes: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
        usuarioId: ['', [Validators.required]],
        pacienteId: ['', [Validators.required]],
      },
    );

    const result = await PacienteService.buscarPacientePorId(this.pacienteId) as any;
    if(result.message === null) {
      this.router.navigate(['404']);
    }
    if(result.status === 'success') {
      this.registerForm.setValue({
        pacienteId: result.message.id,
        usuarioId: 1,
        laudo: '',
        detalhes: '',
      });
      this.registerForm.patchValue(result.message);
    }
  }

  async cadastrar(){
  if (this.registerForm.valid) {
        this.loading = true;
        console.log('loading start', this.loading);
        const result = await ExameService.cadastrarExame(this.registerForm.value) as any;
        if(result.status === 'success') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Sucesso ao cadastrar exame!',
            icon: 'success',
          });
          this.router.navigate([`/exames/listarExames/${this.pacienteId}`]);
        }
        else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Erro ao cadastrar paciente!',
            icon: 'error',
          });
        }
        this.loading = false;
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
