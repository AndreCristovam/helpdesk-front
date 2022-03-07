import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number}, // passando Id para o Modal
    public dialogRef: MatDialogRef<ClienteDeleteComponent>,
    public dialog: MatDialog, // modal
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // sempre que o componente inicia ele pega o id da url
    //this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  
  findById(): void {
    this.service.findById(this.data.id).subscribe(resposta => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  
  delete(): void {
    this.onNoClick();
    this.service.delete(this.data.id).subscribe(() =>{
      this.toast.success('Cliente deletado com sucesso.', 'Sucesso!');
      this.router.navigate(['clientes'])
    }, ex => {
      console.log(ex);
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });        
      }else {
        this.toast.error(ex.error.message);
      }
    })
  } 

  onNoClick(): void {
    this.dialogRef.close();
  }

}
