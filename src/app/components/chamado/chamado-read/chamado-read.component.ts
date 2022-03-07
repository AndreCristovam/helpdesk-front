import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';


@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number}, // passando Id para o Modal
    public dialogRef: MatDialogRef<ChamadoReadComponent>,
    public dialog: MatDialog, // modal
    private chamadoService: ChamadoService,    
    private toastService:   ToastrService, 
    private route:          ActivatedRoute) { }

  ngOnInit(): void {    
    this.findById();    
  }

  findById(): void {   
    this.chamadoService.findById(this.data.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}