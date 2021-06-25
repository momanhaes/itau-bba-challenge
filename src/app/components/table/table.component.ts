import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import { IBusiness } from './table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatTable) public table!: MatTable<IBusiness>;
  @ViewChild(MatSort) public sort!: MatSort;
  @Input() public data!: IBusiness[];

  public dataSource!: TableDataSource;
  public displayedColumns = [
    'name',
    'business',
    'valuation',
    'situation',
    'action',
  ];

  constructor() {}

  public getDotSituation(active: boolean): string {
    return active ? 'fa fa-circle color-green' : 'fa fa-circle color-red';
  }

  ngOnInit(): void {
    this.dataSource = new TableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
