import { ContractsService } from '../contracts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-kits',
  templateUrl: './contracts-kits.component.html',
  styleUrls: ['./contracts-kits.component.css']
})
export class ContractsKitsComponent implements OnInit {
  contractIndex: number;
  contractName: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractsService: ContractsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.contractIndex = +params['id'];
        // this.contractName = this.contractsService.getContract(this.contractIndex).name;
        // this.contractsService.getContract()
      }
    )
  }

}
