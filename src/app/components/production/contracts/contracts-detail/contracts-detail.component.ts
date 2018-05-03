import { ContractsService } from '../contracts.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-detail',
  templateUrl: './contracts-detail.component.html',
  styleUrls: ['./contracts-detail.component.css']
})
export class ContractsDetailComponent implements OnInit {
  contract: any;
  id: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractsService: ContractsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
        this.contract = this.contractsService.getContract(this.id)
        console.log(this.contract);
      }
    )

    // this.route.data.subscribe(
    //   (data: Data) => {
    //     this.contract = data['contract'];
    //   }
    // );

  }

  dateToString = this.contractsService.dateToString;

  onEditContract(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onAddKit(){
    this.router.navigate(['kits', 'new'], {relativeTo: this.route});
  }

  onDeleteContract(){    
    console.log(this.id);
    this.contractsService.deleteContract(this.id).subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
