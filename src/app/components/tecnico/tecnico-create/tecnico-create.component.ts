import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnicos';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
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
    public dialogRef: MatDialogRef<TecnicoCreateComponent>,
    public dialog: MatDialog,
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }
  
  // metodo que cria um novo Tecnico
  create(): void {
    this.onNoClick();
    this.service.create(this.tecnico).subscribe(() =>{
      this.toast.success('Técnico cadastrado com sucesso', 'Sucesso!');
      this.router.navigate(['tecnicos'])
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

  // metodo que add um perfil ao novo tecnico 
  addPerfil(perfil: any): void {   
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }else{
      this.tecnico.perfis.push(perfil);  
    }
  }

  // metodo que valida os campos de cadastro novo tecnico
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
