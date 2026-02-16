import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '@shared';
import { Router } from '@angular/router';
import {
  //AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup
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

/**
 *  id              Int      @id @default(autoincrement())
  // idempotencyKey String   @unique @db.VarChar(18)
  laudo           String   @db.Text
  detalhes        String?  @db.Text // maquina, equipamento, versão software
  usuarioId       Int
  pacienteId      Int
  usuario         Usuario  @relation(fields: [usuarioId], references: [id])
  paciente        Paciente @relation(fields: [pacienteId], references: [id])
  dataCriacao     DateTime @default(now())
  dataAtualizacao DateTime @updatedAt
 */

@Component({
  selector: 'app-pacientes-novoPaciente',
  imports: [PageHeader, MatButtonModule, MatCardModule, MatCheckboxModule,
    MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    TranslateModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './editar-paciente.html',
  styleUrl: './editar-paciente.css'
})
export class PacientesEditarPaciente {
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
        nome: ['', [Validators.minLength(3), Validators.maxLength(191)]],
        documento: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        email: ['', [Validators.required, Validators.email]],
        endereco: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
        tel1: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
        tel2: ['', [Validators.minLength(10), Validators.maxLength(11)]],
      },
    );

    const result = await PacienteService.buscarPacientePorId(this.pacienteId) as any;
    console.log(result);
    if(result.message === null) {
      this.router.navigate(['404']);
    }
    if(result.status === 'success') {
      this.registerForm.patchValue(result.message);
    }
  }

  async atualizar() {
    if (this.registerForm.valid) {
        this.loading = true;
        const result = await PacienteService.atualizarPaciente({...this.registerForm.value, id: this.pacienteId}) as any;
        if(result.status === 'success') {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Sucesso ao atualizar paciente!',
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
            title: 'Erro ao atualizar paciente!',
            icon: 'error',
          });
        }
        this.loading = false;
    } else {
      this.registerForm.markAllAsTouched();
    }

  }
}
