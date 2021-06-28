import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { IBusiness } from '../table/table.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [APPEARD],
})
export class ListComponent implements OnInit {
  public state = 'ready';

  @Input() data!: IBusiness[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public getDotSituation(active: boolean): string {
    return active ? 'fa fa-circle color-green' : 'fa fa-circle color-red';
  }

  public edit(business: IBusiness): void {
    this.router.navigate(['business-register', business.id]);
  }
}
