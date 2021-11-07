import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {
  brands: any = [];
  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.loadBrandList();
  }
  loadBrandList() {
    this.brandService.getBrands().subscribe((response: any) => {
      if (response['success']) {
        this.brands = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }
  addBrand() {
    this.router.navigate(['/brand-add']);
  }
  onEdit(brand: any) {
    this.router.navigate(['/brand-add'], {
      queryParams: { id: brand['comp_id'] },
    });
  }
  onDelete(brand: any) {
    this.brandService
      .deleteBrands(brand['comp_id'])
      .subscribe((response: any) => {
        if (response['success']) {
          this.loadBrandList();
        } else {
          console.log(response['error']);
        }
      });
  }
}
