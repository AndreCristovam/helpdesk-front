import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnicos';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) public data: {id: Number}, // passando Id para o Modal
    public dialogRef: MatDialogRef<TecnicoUpdateComponent>,
    public dialog: MatDialog, // modal
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // sempre que o componente inicia ele pega o id da url
    //this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  
  findById(): void {
    this.service.findById(this.data.id).subscribe(resposta => { // att para data.id para passar os dados no modal
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }

  // metodo que atualiza um Tecnico
  update(): void {
    this.onNoClick();
    this.service.update(this.tecnico).subscribe(() =>{
      this.toast.success('Técnico atualizado com sucesso', 'Sucesso!');
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