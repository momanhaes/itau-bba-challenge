import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { BusinessService } from 'src/app/services/business.service';
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

  constructor(
    private router: Router,
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
    this.businessService.notifier.subscribe((business) => {
      this.data = business;
    });
  }

  public getDotSituation(active: boolean): string {
    return active ? 'fa fa-circle color-green' : 'fa fa-circle color-red';
  }

  public edit(business: IBusiness): void {
    this.router.navigate(['business-register', business.id]);
  }
}
