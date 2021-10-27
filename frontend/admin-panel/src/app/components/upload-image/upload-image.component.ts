import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  selectedFile: any = null;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  onImageSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUploadImage() {
    const id = this.activateRoute.snapshot.queryParams['id'];
    this.productService
      .uploadImage(id, this.selectedFile)
      .subscribe((response: any) => {
        if (response['status'] == 'success') {
          this.router.navigate(['/product-list']);
        } else {
          console.log(response['error']);
        }
      });
  }
}
