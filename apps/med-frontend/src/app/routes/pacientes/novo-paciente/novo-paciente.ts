import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '@shared';
import {
  //AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { PacienteService } from 'apps/med-frontend/src/services/paciente.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes-novoPaciente',
  imports: [PageHeader, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    TranslateModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './novo-paciente.html',
  styleUrl: './novo-paciente.css'
})
export class PacientesNovoPaciente {
  private readonly fb = inject(FormBuilder);

  loading = false;
  
  registerForm = this.fb.nonNullable.group(
    {
      nome: ['', [Validators.minLength(3), Validators.maxLength(191)]],
      documento: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
      tel1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      tel2: ['', [Validators.minLength(10), Validators.maxLength(11)]],
    },
    
  );

  async cadastrar() {
    if (this.registerForm.valid) {
        this.loading = true;
        console.log('loading start', this.loading);
        const result = await PacienteService.cadastrarPaciente(this.registerForm.value) as any;
        if(result.status === 'success') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Sucesso ao cadastrar paciente!',
            icon: 'success',
          });
          this.registerForm.reset();
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
