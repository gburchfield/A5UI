import { ActivatedRoute, Router } from '@angular/router';
import { AlisProductService } from '../alis-product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alis-product-start',
  templateUrl: './alis-product-start.component.html',
  styleUrls: ['./alis-product-start.component.css']
})
export class AlisProductStartComponent implements OnInit {

  constructor(private alisProductService: AlisProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onAddProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
