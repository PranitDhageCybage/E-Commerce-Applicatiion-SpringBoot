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
    // this.loadUserCount();
    // this.loadProductCount();
    // this.loadOrderCount();
    // this.loadActiveOrderCount();
    // this.loadBrandsCount();
    // this.loadCategoriessCount();
  }

  loadAllCount() {
    this.dashboardService
      .getDashboardTotalCount()
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          const allDashboard = response['data'];
          this.totalUser = allDashboard['totalUser'];
          this.totalProduct = allDashboard['totalProduct'];
          this.totalOrder = allDashboard['totalOrder'];
          this.activeOrder = allDashboard['activeOrder'];
          this.totalBrands = allDashboard['totalBrands'];
          this.totalCategories = allDashboard['totalCategories'];
        } else {
          console.log(response['error']);
        }
      });
  }

  // loadUserCount() {
  //   this.dashboardService.getUserCount().subscribe((response: any) => {
  //     if (response['status'] == 'success') {
  //       this.totalUser = response['data'][0]['totalUser'];
  //     } else {
  //       console.log(response['error']);
  //     }
  //   });
  // }

  // loadProductCount() {
  //   this.dashboardService.getProductCount().subscribe((response: any) => {
  //     if (response['status'] == 'success') {
  //       this.totalProduct = response['data'][0]['totalProduct'];
  //     } else {
  //       console.log(response['error']);
  //     }
  //   });
  // }

  // loadOrderCount() {
  //   this.dashboardService.getOrderCount().subscribe((response: any) => {
  //     if (response['status'] == 'success') {
  //       this.totalOrder = response['data'][0]['totatOrder'];
  //     } else {
  //       console.log(response['error']);
  //     }
  //   });
  // }

  // loadActiveOrderCount() {
  //   this.dashboardService.getActiveOrderCount().subscribe((response: any) => {
  //     if (response['status'] == 'success') {
  //       this.activeOrder = response['data'][0]['activeOrder'];
  //     } else {
  //       console.log(response['error']);
  //     }
  //   });
  // }
  // loadBrandsCount() {
  //   this.dashboardService.getBrandsCount().subscribe((response: any) => {
  //     if (response['status'] == 'success') {
  //       this.totalBrands = response['data'][0]['totalBrands'];
  //     } else {
  //       console.log(response['error']);
  //     }
  //   });
  // }

  // loadCategoriessCount() {
  //   this.dashboardService.getCategoriesCount().subscribe((response: any) => {
  //     if (response['status'] == 'success') {
  //       this.totalCategories = response['data'][0]['totalCategories'];
  //     } else {
  //       console.log(response['error']);
  //     }
  //   });
  // }
}
