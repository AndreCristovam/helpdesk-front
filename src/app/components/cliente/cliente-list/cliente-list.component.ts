import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
//import { report } from 'process';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteCreateComponent } from '../cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from '../cliente-delete/cliente-delete.component';
import { ClienteUpdateComponent } from '../cliente-update/cliente-update.component';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  
  ELEMENT_DATA: Cliente[] =[]
  refreshTable: Subscription;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: {id: Number} // recebendo o Id para o modal

  constructor(private service: ClienteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll();
    this.refresh();
  }

  ngOnDestroy(): void {
    this.refreshTable.unsubscribe();
  }

  findAll() {
    this.service.findAll().subscribe(respota => {
        this.ELEMENT_DATA = respota
        this.dataSource = new MatTableDataSource<Cliente>(respota);
        this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh(){
    this.refreshTable = this.service.refresh$.subscribe(() => {
      this.findAll();
    })
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(ClienteCreateComponent, {
      width: '630px', height: '600px',     
    });
  }
  
  openUpdate(id: Number): void {
    const dialogRef = this.dialog.open(ClienteUpdateComponent, {
      width: '630px', height: '600px',
      data: { id }//Pegando ID tecnico para editar..
    });
  }

  
  openDelete(id: Number): void {
    const dialogRef = this.dialog.open(ClienteDeleteComponent, {
      width: '630px', height: '600px',
      data: { id }//Pegando ID tecnico para editar..
    });
  }  

}
