import { ContractsService } from '../../contracts.service';
import { AlisProductService } from '../../../../process/alis-product/alis-product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets-detail',
  templateUrl: './assets-detail.component.html',
  styleUrls: ['./assets-detail.component.css']
})
export class AssetsDetailComponent implements OnInit {
  contract: any;
  kit: any;
  constructor(private alisProductService: AlisProductService,
              private contractsService: ContractsService) { }

  ngOnInit() {
    this.alisProductService.getProducts().subscribe(
      (response) => {
        console.log('*****Products Array is Loaded*****');
        console.log(response);
      }
    );
    this.kit = this.contractsService.getSelectedKit();
    this.contract = this.contractsService.getSelectedContract();
    console.log(this.kit);
  }

  onAssetDelete(index: number){
    var buffer = this.kit.assets[index];
    this.contractsService.deleteAsset(buffer._id, buffer.kitRef, buffer.nodeHome).subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.kit.assets.splice(index, 1);
  }

}
