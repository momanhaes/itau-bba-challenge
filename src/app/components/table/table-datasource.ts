import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export enum SituationType {
  UNAVAILABLE = 'UNAVAILABLE',
  AVAILABLE = 'AVAILABLE',
}

export interface TableItem {
  id: string;
  name: string;
  business: string;
  valuation: number;
  situation: string;
}

const DATA: TableItem[] = [
  {
    id: '123',
    name: 'Itaú BBA',
    business: 'Financial Center',
    valuation: 850000000.5,
    situation: SituationType.AVAILABLE,
  },
  {
    id: '321',
    name: 'Itaú Ceic',
    business: 'Centro Empresarial Itaú',
    valuation: 54000000.45,
    situation: SituationType.AVAILABLE,
  },
  {
    id: '231',
    name: 'Cubo Itaú',
    business: 'Startups Center',
    valuation: 22000000000.2,
    situation: SituationType.AVAILABLE,
  },
  {
    id: '132',
    name: 'Itaú Disabled',
    business: 'Polo Fake',
    valuation: 0,
    situation: SituationType.UNAVAILABLE,
  },
];

export class TableDataSource extends DataSource<TableItem> {
  public paginator: MatPaginator | undefined;
  public sort: MatSort | undefined;
  public data: TableItem[] = DATA;

  constructor() {
    super();
  }

  connect(): Observable<TableItem[]> {
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

  private getPagedData(data: TableItem[]): TableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: TableItem[]): TableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'business':
          return compare(a.business, b.business, isAsc);
        case 'valuation':
          return compare(+a.valuation, +b.valuation, isAsc);
        case 'situation':
          return compare(+a.situation, +b.situation, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
