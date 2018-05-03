import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Node } from '../navigation/nodes-list/node.model';
import { Asset } from './asset.model';
import { EnterpriseService } from '../../enterprise.service';
@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  node: any;
  assets: Asset[];
  constructor(private enterpriseService: EnterpriseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => (
        this.enterpriseService.getNode(+params["countryId"], +params["locationId"], +params["nodeId"]).subscribe(
          (node:any) => {
            this.node = node; 
            console.log(this.node);
            this.assets = node.assets;
          },
          (error) => console.log(error)
        )
      )
    );


    // this.enterpriseService.nodeSelected.subscribe(
    //   (node:Node) => {
    //     this.node = node;
    //     this.assets = node.assets;
    //     console.log(this.node);
    //   }
    // );
  }

}
