import { ActivatedRoute, Router } from '@angular/router';
import { ContractsService } from '../../contracts.service';
import { AlisProductService } from '../../../../process/alis-product/alis-product.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets-edit',
  templateUrl: './assets-edit.component.html',
  styleUrls: ['./assets-edit.component.css']
})

export class AssetsEditComponent implements OnInit {
  kitAssetsForm: FormGroup;
  kitAssets = [];
  bodyArray = [];
  productOptions = [];
  buildProcess = [
    {
      phaseName: "Assembly",
      tasks: [
        {
          taskName: "Assembly Hardware"
        },
        {
          taskName: "Capture Serial Number"
        },
        {
          taskName: "Handoff to Engineering"
        }]
    },
    {
      phaseName: "Configuration",
      tasks: [
        {
          taskName: "Assign ALIS Node Name"
        },
        {
          taskName: "Install Base Image"
        },
        {
          taskName: "Install ALIS"
        },
        {
          taskName: "Information Assurance"
        },
        {
          taskName: "Quality Assurance"
        }]
    },
    {
      phaseName: "Deployment",
      tasks: [
        {
          taskName: "Submit DTS (Delivery To Shipping)"
        },
        {
          taskName: "Submit eShipper"
        },
        {
          taskName: "DRR (Deployment Readiness Review)"
        }]
    },
    {
      phaseName: "Shipping",
      tasks: [
        {
          taskName: "Package Hardware"
        },
        {
          taskName: "Move to Shipping Dock"
        },
        {
          taskName: "Handoff to Engineering"
        }]
    }];
  constructor(private alisProductService: AlisProductService, 
              private contractsService: ContractsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.productOptions = this.alisProductService.getProductsArray();
    console.log(this.productOptions);
    this.onAddAsset();
  }

  private initForm() {
    let assets = new FormArray([]);
    this.kitAssetsForm = new FormGroup({
      'assets': assets
    });

  }

  onSubmit(){
    for(let asset of this.kitAssetsForm.value.assets){
      let tempAssetObject = this.productOptions[asset.productName];
      delete tempAssetObject._id;
      tempAssetObject['nodeHome'] = this.contractsService.getSelectedKit().nodeRef._id;
      tempAssetObject['kitRef'] = this.contractsService.getSelectedKit()._id;

      for(let child of tempAssetObject.childAssets){
        delete child._id;
        if(child.hardDrives !== 0){
          let hdCount = child.hardDrives;
          child.hardDrives = [];
          for(let i=0;i < hdCount; i++){
            child.hardDrives.push({slot:i+1});
          }
        } else {
          delete child.hardDrives;
        }
        if(child.servers !== 0){
          let serverCount = child.servers;
          child.servers = [];
          for(let i=0;i < serverCount; i++){
            child.servers.push({node:i+1});
          }
        } else {
          delete child.servers;
        }
      }
      tempAssetObject["log"] = {};
      tempAssetObject["log"]["build"] = [];
      for(let phase of this.buildProcess){
        tempAssetObject.log.build.push(phase);
      }
      

      for(let i=0;i<asset.productQty;i++){
        this.kitAssets.push(tempAssetObject);
      }
    }
    console.log(this.kitAssets);
    this.contractsService.addAssets(this.kitAssets).subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  
    


  onAddAsset() {
    (<FormArray>this.kitAssetsForm.get('assets')).push(
      new FormGroup({
        'productName': new FormControl('default', Validators.required),
        'productQty': new FormControl(1, Validators.required)
      })
    )
  }

  onRemoveAsset(index: number) {
    (<FormArray>this.kitAssetsForm.get('assets')).removeAt(index);
  }

}
