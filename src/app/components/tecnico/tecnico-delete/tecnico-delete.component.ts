import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnicos';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
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
    public dialogRef: MatDialogRef<TecnicoDeleteComponent>,
    public dialog: MatDialog, // modal
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // sempre que o componente inicia ele pega o id da url
   // this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  
  findById(): void {
    this.service.findById(this.data.id).subscribe(resposta => {
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }

  // metodo que atualiza um Tecnico
  delete(): void {
    this.onNoClick();
    this.service.delete(this.data.id).subscribe(() =>{
      this.toast.success('Técnico deletado com sucesso.', 'Sucesso!');
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
