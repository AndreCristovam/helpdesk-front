import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ChamadoCreateComponent } from '../chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from '../chamado-update/chamado-update.component';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []

  refreshTable: Subscription;

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: {id: Number} // recebendo o Id para o modal

  constructor(
    private service: ChamadoService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll();
    this.refresh();
  }

  ngOnDestroy(): void {
    this.refreshTable.unsubscribe();
  }

  refresh(){
    this.refreshTable = this.service.refresh$.subscribe(() => {
      this.findAll();
    })
  }

  findAll(): void {
      this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  // metodo que ordena por tipo de status 
  orderByStatus(status: any): void {
    let list: Chamado[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status) {
        list.push(element)
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  } 

  openCreate(): void {
    const dialogRef = this.dialog.open(ChamadoCreateComponent, {
      width: '630px', height: '600px',     
    });
  }

  openUpdate(id: Number): void {
    const dialogRef = this.dialog.open(ChamadoUpdateComponent, {
      width: '630px', height: '600px',
      data: { id }//Pegando ID tecnico para editar..
    });
  }

}
