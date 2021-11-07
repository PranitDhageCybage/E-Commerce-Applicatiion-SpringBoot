import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brand: any = null;
  title: string = '';
  description: string = '';

  constructor(
    private router: Router,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if (id) {
      // If Id is present, Edit brand
      // else Add brand
      this.brandService.getBrand(id).subscribe((response: any) => {
        if (response['success']) {
          this.brand = response['data'];
          this.title = this.brand['comp_title'];
          this.description = this.brand['comp_description'];
        } else {
          console.log(response['error']);
        }
      });
    }
  }

  onUpdate() {
    if (this.brand) {
      //Edit
      this.brandService
        .updateBrands(this.brand['comp_id'], this.title, this.description)
        .subscribe((response: any) => {
          if (response['success']) {
            this.router.navigate(['/brand-list']);
          } else {
          }
        });
    } else {
      //Insert
      this.brandService
        .addBrands(this.title, this.description)
        .subscribe((response: any) => {
          if (response['success']) {
            this.router.navigate(['/brand-list']);
          } else {
          }
        });
    }
  }
}
