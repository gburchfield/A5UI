import { AlisProductService } from '../alis-product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alis-product-edit',
  templateUrl: './alis-product-edit.component.html',
  styleUrls: ['./alis-product-edit.component.css']
})
export class AlisProductEditComponent implements OnInit {
  id: string;
  editMode= false;
  productForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private alisProductService: AlisProductService) {} 

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let productName = '';
    let productPartNum = '';
    let productIUID = '';
    let productAssetType = '';
    let productAssetSubType = '';
    let productClassification = '';
    let productChildAssets = new FormArray([]);

    if(this.editMode){
      const product = this.alisProductService.getSelectedProduct();
      console.log(typeof(product._id));
      this.id = product._id;
      productName = product.name;
      productPartNum = product.partNum;
      productIUID = product.IUID;
      productAssetType = product.assetType;
      productAssetSubType = product.assetSubType;
      productClassification = product.classification;
      if(product['childAssets']){
        for (let childAsset of product.childAssets) {
          productChildAssets.push(
            new FormGroup({
              'name': new FormControl(childAsset.name, Validators.required),
              'partNum': new FormControl(childAsset.partNum, Validators.required),
              'cage': new FormControl(childAsset.cage, Validators.required),
              'mfg': new FormControl(childAsset.mfg, Validators.required),
              'modelNum': new FormControl(childAsset.modelNum, Validators.required),
              'venPartNum': new FormControl(childAsset.venPartNum, Validators.required),
              'hardDrives': new FormControl(childAsset.hardDrives, Validators.required),
              'servers': new FormControl(childAsset.servers, Validators.required)
            })
          )
        }
      }
    }

    this.productForm = new FormGroup({
      'name': new FormControl(productName, Validators.required),
      'partNum': new FormControl(productPartNum, Validators.required),
      'IUID': new FormControl(productIUID),
      'assetType': new FormControl(productAssetType, Validators.required),
      'assetSubType': new FormControl(productAssetSubType, Validators.required),
      'classification': new FormControl(productClassification, Validators.required),
      'childAssets': productChildAssets
    });
  }

  onSubmit(){
    if(this.editMode) {
      this.alisProductService.updateProduct(this.id, this.productForm.value)
        .subscribe(
          (response) => console.log(response)
        )
    } else {
      this.alisProductService.addProduct(this.productForm.value)
        .subscribe(
          (response) => console.log(response)
        );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddAsset() {
    (<FormArray>this.productForm.get('childAssets')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'partNum': new FormControl(null, Validators.required),
        'cage': new FormControl(null, Validators.required),
        'mfg': new FormControl(null, Validators.required),
        'modelNum': new FormControl(null, Validators.required),
        'venPartNum': new FormControl(null, Validators.required),
        'hardDrives': new FormControl(0, Validators.required),
        'servers': new FormControl(0, Validators.required)
      })
    )
  }
  
  onRemoveAsset(index: number) {
    (<FormArray>this.productForm.get('childAssets')).removeAt(index);
  }
  
}
