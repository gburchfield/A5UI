import { ContractsService } from '../../contracts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kits-list',
  templateUrl: './kits-list.component.html',
  styleUrls: ['./kits-list.component.css']
})
export class KitsListComponent implements OnInit {
  contractIndex: string;
  kits: any[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractsService: ContractsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.contractIndex = params['id'];
        //this.kits = this.contractsService.getContract(this.contractIndex).kits;
      }
    )
  }

  onKitDetails(kitIndex:number){
    this.router.navigate([this.contractIndex,kitIndex], {relativeTo: this.route})
  }


}
