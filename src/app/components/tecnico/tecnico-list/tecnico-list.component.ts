import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
//import { report } from 'process';
import { Tecnico } from 'src/app/models/tecnicos';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { TecnicoCreateComponent } from '../tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from '../tecnico-delete/tecnico-delete.component';
import { TecnicoUpdateComponent } from '../tecnico-update/tecnico-update.component';


@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {
  
  ELEMENT_DATA: Tecnico[] =[]

  refreshTable: Subscription;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: {id: Number} // recebendo o Id para o modal
  
  constructor(
   //public dialogRef: MatDialogRef<TecnicoListComponent>, // teste aki
    private service: TecnicoService,
    public dialog: MatDialog) { }

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
        this.dataSource = new MatTableDataSource<Tecnico>(respota);
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

  // Modal Update Tecnico
  openUpdate(id: Number): void {
    const dialogRef = this.dialog.open(TecnicoUpdateComponent, {
      width: '630px', height: '600px',
      data: { id }//Pegando ID tecnico para editar..
    });
  }

  
  openDelete(id: Number): void {
    const dialogRef = this.dialog.open(TecnicoDeleteComponent, {
      width: '630px', height: '600px',
      data: { id }//Pegando ID tecnico para editar..
    });
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(TecnicoCreateComponent, {
      width: '630px', height: '600px',     
    });
  }

}
