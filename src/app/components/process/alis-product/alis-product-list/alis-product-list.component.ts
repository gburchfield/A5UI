import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { AlisProductService } from '../alis-product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-alis-product-list',
  templateUrl: './alis-product-list.component.html',
  styleUrls: ['./alis-product-list.component.css']
})
export class AlisProductListComponent implements OnInit, OnDestroy {
  classifiedProducts: any[];
  unclassifiedProducts: any[];
  isTypeSelected = false;
  isSubTypeSelected = false;
  products: any[];
  productTypes: string[];
  productSubTypes: string[];
  selectedProductType: string;
  selectedProductSubType: string;
  selectedProducts: any[];
  selectedSubTypeProducts: any[];
  subscription: Subscription;
  constructor(private alisProductService: AlisProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.alisProductService.productsChanged.subscribe(
      (products: any[]) => {
        this.products = products;
      }
    )

    this.alisProductService.getProducts().subscribe(
      (products: any[]) => {
        this.products = products;
        this.productTypes = this.getAssetTypes();
        console.log(this.productTypes);
      },
      (error) => console.log(error)
    )
    
  }

  getAssetTypes() {
    let assetTypes = [];
    this.products.forEach(
      (product) => {
        if(!assetTypes.includes(product.assetType) && product.assetType !== undefined)
          {
            assetTypes.push(product.assetType);
          }
      }
    );
    return assetTypes.sort();
  }

  getAssetSubTypes() {
    let assetSubTypes = [];
    this.selectedProducts.forEach(
      (product) => {
        console.log(product.assetSubType);
        if(!assetSubTypes.includes(product.assetSubType) && product.assetSubType !== undefined)
          {
            assetSubTypes.push(product.assetSubType);
          }
      }
    );
    return assetSubTypes.sort();
  }

  goToSubTypes(productType) {
    this.isSubTypeSelected = false;
    this.selectedProducts = [];
    this.selectedProductType = productType;
    this.products.forEach(
      (product) => {
        if(product.assetType === productType)
          {
            this.selectedProducts.push(product);
          }
      }
    );
    this.productSubTypes = this.getAssetSubTypes();
    this.isTypeSelected = true;
  }

  goToProducts(subType) {
    this.selectedProductSubType = subType;
    this.selectedSubTypeProducts = [];
    this.unclassifiedProducts = [];
    this.classifiedProducts = [];
    this.selectedProducts.forEach(
      (product) => {
        console.log(product);
        if(product.assetSubType === subType)
          {
            this.selectedSubTypeProducts.push(product);
          }
      }
    );
    this.selectedSubTypeProducts.forEach(
      (product)=>{
        if(product.classification === "Unclassified"){
          this.unclassifiedProducts.push(product);
        } else {
          this.classifiedProducts.push(product);
        }
      }
    );
    this.isSubTypeSelected = true;
  }

  onAddProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

}
