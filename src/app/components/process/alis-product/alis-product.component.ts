import { AlisProductService } from './alis-product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alis-product',
  templateUrl: './alis-product.component.html',
  styleUrls: ['./alis-product.component.css'],
  providers: []
})
export class AlisProductComponent implements OnInit {

  constructor(private alisProductService: AlisProductService) { }

  ngOnInit() {
  }

}
