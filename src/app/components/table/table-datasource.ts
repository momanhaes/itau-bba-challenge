import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { IBusiness } from './table.interface';

export class TableDataSource extends DataSource<IBusiness> {
  public paginator: MatPaginator | undefined;
  public sort: MatSort | undefined;

  constructor(public data: IBusiness[]) {
    super();
  }

  connect(): Observable<IBusiness[]> {
    if (this.paginator && this.sort) {
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  disconnect(): void {}

  private compare(
    a: string | number | boolean,
    b: string | number | boolean,
    isAsc: boolean
  ): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private getPagedData(data: IBusiness[]): IBusiness[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: IBusiness[]): IBusiness[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';

      switch (this.sort?.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'business':
          return this.compare(a.business, b.business, isAsc);
        case 'valuation':
          return this.compare(+a.valuation, +b.valuation, isAsc);
        case 'active':
          return this.compare(a.active, b.active, isAsc);
        default:
          return 0;
      }
    });
  }
}
