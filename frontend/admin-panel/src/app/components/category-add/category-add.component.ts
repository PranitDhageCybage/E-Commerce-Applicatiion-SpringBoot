import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent implements OnInit {
  category: any = null;
  title: string = '';
  description: string = '';

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if (id) {
      // If Id is present, Edit brand
      // else Add brand
      this.categoryService.getCategory(id).subscribe((response: any) => {
        if (response['success']) {
          this.category = response['data'];
          this.title = this.category['cat_title'];
          this.description = this.category['cat_description'];
        } else {
          console.log(response['error']);
        }
      });
    }
  }

  onUpdate() {
    if (this.category) {
      //Edit
      this.categoryService
        .updateCategories(this.category['cat_id'], this.title, this.description)
        .subscribe((response: any) => {
          if (response['success']) {
            this.router.navigate(['/category-list']);
          } else {
          }
        });
    } else {
      //Insert
      this.categoryService
        .addCategories(this.title, this.description)
        .subscribe((response: any) => {
          if (response['success']) {
            this.router.navigate(['/category-list']);
          } else {
          }
        });
    }
  }
}
