export class Exame {
    id!: number;
    laudo!: string | null;
    detalhes!: string | null;
    pacienteId!: number;
    usuarioId!: number;
    usuario?: any;
    paciente?: any;
    dataCriacao!: Date;
    dataAtualizacao!: Date;
}
