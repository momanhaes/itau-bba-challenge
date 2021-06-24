import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SituationType, TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;

  public dataSource: TableDataSource;
  public displayedColumns = [
    'name',
    'business',
    'valuation',
    'situation',
    'action',
  ];

  constructor() {
    this.dataSource = new TableDataSource();
  }

  public getDotSituation(situation: SituationType): string {
    return situation === SituationType.AVAILABLE
      ? 'fa fa-circle color-green'
      : 'fa fa-circle color-red';
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
