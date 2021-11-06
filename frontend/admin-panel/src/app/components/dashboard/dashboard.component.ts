import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  totalUser: number = 0;
  totalProduct: number = 0;
  totalOrder: number = 0;
  activeOrder: number = 0;
  totalBrands: number = 0;
  totalCategories: number = 0;
  ngOnInit(): void {
    this.loadAllCount();
  }

  loadAllCount() {
    this.dashboardService
      .getDashboardTotalCount()
      .subscribe((response: any) => {
        if (response['success']) {
          const allDashboard = response['data'];
          this.totalUser = allDashboard['userCount'];
          this.totalProduct = allDashboard['productCount'];
          this.totalOrder = allDashboard['myOrderCount'];
          this.activeOrder = allDashboard['activeOrderCount'];
          this.totalBrands = allDashboard['companyCount'];
          this.totalCategories = allDashboard['categoryCount'];
        }
      });
  }
}
