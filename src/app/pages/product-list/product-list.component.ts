import { AuthenticationService } from './../../services/authentication.service';
import { ProductDetailModalComponent } from './../product-detail-modal/product-detail-modal.component';
import { Product } from './../../interfaces/product';
import { ProductsListService } from './../../services/products-list.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productsListOriginal!: Product[];
  productsListShow!: Product[];
  searchLimit: number = 10;
  categoriesArray!: string[];
  limitArray: number[] = [5, 10, 15, 20];
  selectedCategory!: string;
  public filterForm: FormGroup = this.fb.group({
    category: ['All'],
    limit: [10],
  });

  constructor(
    private productsService: ProductsListService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.productsService.getProductsList(this.searchLimit).subscribe((data) => {
      this.productsListOriginal = data;
      this.productsListShow = data;
      this.createCategoriesArray();
    });
  }

  filterCategories(event: any) {
    this.selectedCategory = event.target.value;
    if (this.selectedCategory === 'All') {
      this.productsListShow = this.productsListOriginal;
      return;
    }
    const filteredProducts = this.productsListOriginal.filter(
      (product) => product.category === this.selectedCategory
    );
    this.productsListShow = filteredProducts;
  }

  filterLimit(event: any) {
    this.searchLimit = event.target.value;
    if (this.searchLimit === 10) {
      this.productsListShow = this.productsListOriginal;
      return;
    }

    this.productsService.getProductsList(this.searchLimit).subscribe((data) => {
      this.productsListOriginal = data;
      this.productsListShow = data;
      this.createCategoriesArray();
    });
  }

  openProductDetailsModal(product: Product) {
    const modalRef = this.modalService.open(ProductDetailModalComponent);
    modalRef.componentInstance.product = product;
  }

  logout() {
    this.authService.logout();
  }

  createCategoriesArray() {
    const groups = this.productsListOriginal.reduce(
      (groups: any, product: Product) => {
        const category = product.category;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(product);
        return groups;
      },
      {}
    );

    const groupArrays = Object.keys(groups).map((category) => {
      return category;
    });

    this.categoriesArray = groupArrays;
  }
}
