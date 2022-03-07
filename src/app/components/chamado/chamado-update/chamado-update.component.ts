import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnicos';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  
  chamado: Chamado = {
    prioridade:  '',
    status:      '',    
    titulo:      '',    
    observacoes: '',
    cliente:     '',
    tecnico:     '',
    nomeTecnico: '',
    nomeCliente: ''
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status:     FormControl = new FormControl(null, [Validators.required])
  titulo:     FormControl = new FormControl(null, [Validators.required])
  observacoes:FormControl = new FormControl(null, [Validators.required])
  tecnico:    FormControl = new FormControl(null, [Validators.required])
  cliente:    FormControl = new FormControl(null, [Validators.required])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number}, // passando Id para o Modal
    public dialogRef: MatDialogRef<ChamadoUpdateComponent>,
    public dialog: MatDialog, // modal
    private chamadoService: ChamadoService,
    private clienteService: ClienteService, 
    private tecnicoService: TecnicoService,
    private toastService:   ToastrService,
    private router:         Router,
    private route:          ActivatedRoute) { }

  ngOnInit(): void {
    //this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.data.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }
  update(): void {
      this.onNoClick();
      this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado atualizado com sucesso', 'Sucesso!');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    }) 
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  // metodo que retorna o status do chamado
  retornaStatus(status: any): String {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'ANDAMENTO'
    }
    return 'ENCERRADO'
  }

  // retorna a prioridade do chamado
  retornaPrioridade(prioridade: any): String {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    }
    return 'ALTA'
  }
  
  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid &&
      this.titulo.valid && this.observacoes.valid &&
      this.tecnico.valid && this.cliente.valid
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
