import { Product } from './../../interfaces/product';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css'],
})
export class ProductDetailModalComponent {
  @Input() product!: Product;

  constructor(public activeModal: NgbActiveModal) {}
}
