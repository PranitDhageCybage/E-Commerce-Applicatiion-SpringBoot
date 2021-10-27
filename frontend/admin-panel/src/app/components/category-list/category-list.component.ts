import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: any = [];
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategoryList();
  }
  loadCategoryList() {
    this.categoryService.getCategories().subscribe((response: any) => {
      if (response['status'] == 'success') {
        this.categories = response['data'];
      } else {
        console.log(response['error']);
      }
    });
  }
  addCategory() {
    this.router.navigate(['/category-add']);
  }
  onEdit(category: any) {
    this.router.navigate(['/category-add'], {
      queryParams: { id: category['id'] },
    });
  }
  onDelete(category: any) {
    this.categoryService
      .deleteCategories(category['id'])
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.loadCategoryList();
        } else {
          console.log(response['error']);
        }
      });
  }
}
