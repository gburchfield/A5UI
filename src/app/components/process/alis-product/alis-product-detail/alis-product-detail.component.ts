import { AlisProductService } from '../alis-product.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alis-product-detail',
  templateUrl: './alis-product-detail.component.html',
  styleUrls: ['./alis-product-detail.component.css']
})
export class AlisProductDetailComponent implements OnInit {
  product: any;
  index: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private alisProductService: AlisProductService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.product = data['product'];
        console.log(data['product']);
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onEditProduct(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProduct(){
    this.alisProductService.deleteProduct(this.index).subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
