import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number}, // passando Id para o Modal
    public dialogRef: MatDialogRef<ClienteUpdateComponent>,
    public dialog: MatDialog, // modal
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // sempre que o componente inicia ele pega o id da url
    this.findById();
  }
  
  findById(): void {
    this.service.findById(this.data.id).subscribe(resposta => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  // metodo que atualiza um Cliente
  update(): void {
    this.onNoClick();
    this.service.update(this.cliente).subscribe(() =>{
      this.toast.success('Cliente atualizado com sucesso', 'Sucesso!');
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

  // metodo que add um perfil ao novo cliente 
  addPerfil(perfil: any): void {   
    if(this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    }else{
      this.cliente.perfis.push(perfil);  
    }
  }

  // metodo que valida os campos de cadastro novo cliente
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}