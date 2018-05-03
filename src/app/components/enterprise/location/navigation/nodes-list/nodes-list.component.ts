import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Country } from '../countries-list/country.model';
import { Location } from '../locations-list/location.model';
import { Node } from './node.model';
import { EnterpriseService } from '../../../enterprise.service';
@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.css']
})
export class NodesListComponent implements OnInit {
  countryId: number;
  locationId: number;
  location: any;
  nodes: Node[];
  constructor(private enterpriseService: EnterpriseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.countryId = params['countryId'];
        this.locationId = params['locationId'];
        this.location = this.enterpriseService.getLocation(this.countryId, this.locationId);
        this.nodes = this.location.nodes;
        this.grabNodeAssets();
      }
    );
  }

  grabNodeAssets(){
    var nodeIds: [string] = [''];
    this.nodes.forEach((node) => {
      nodeIds.push(node._id);
    });
    nodeIds.shift();
    console.log(nodeIds);
    this.enterpriseService.getArrayOfNodes(nodeIds).subscribe(
      (nodes) => {
        this.inventoryAssets(nodes);
      }
    );
  }

  inventoryAssets(Nodes){
    let subTypes = [];
    let subTypeCount = {};
    for(let node of Nodes){
      for(let asset of node.assets){
        if(!subTypes.includes(asset.name)){
          subTypes.push(asset.name);
          subTypeCount[asset.name] = 1;
        } else {
          subTypeCount[asset.name] += 1;
        }
      }
    }
    console.log(subTypes);
    console.log(subTypeCount);
  }

}
