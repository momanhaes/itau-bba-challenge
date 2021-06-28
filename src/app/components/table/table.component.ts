import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';
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

  public dataSource!: MatTableDataSource<IBusiness>;
  public displayedColumns: string[] = [
    'name',
    'business',
    'valuation',
    'situation',
    'action',
  ];

  constructor(
    private router: Router,
    private businessService: BusinessService
  ) {}

  public getDotSituation(active: boolean): string {
    return active ? 'fa fa-circle color-green' : 'fa fa-circle color-red';
  }

  public edit(business: IBusiness): void {
    this.router.navigate(['business-register', business.id]);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);

    this.businessService.notifier.subscribe((business) => {
      this.dataSource = new MatTableDataSource(business);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
