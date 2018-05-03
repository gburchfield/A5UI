import { CustomersService } from '../../customers/customers.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ContractsService } from '../contracts.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css']
})
export class ContractsListComponent implements OnInit, OnDestroy {
  contracts: any[];
  editContract = false;
  subscription: Subscription;
  constructor(private contractsService: ContractsService, private route: ActivatedRoute, private router: Router, private customersService: CustomersService) { }

  ngOnInit() {
    this.subscription = this.contractsService.contractsChanged.subscribe(
      (newContract: any) => {
        if(newContract === 'deleted'){
          this.contractsService.getContracts().subscribe(
            (contracts: any[]) => this.contracts = contracts,
            (error) => console.log(error)
          );
        } else {
          this.contracts.forEach((contract, index) => {
            if(contract._id === newContract._id){
              this.editContract = true;
              console.log('*****CONTRACT UPDATED*****');
              console.log(index);
              this.contracts[index] = newContract;
            }
          });
          if(this.editContract === false){
            this.contracts.push(newContract);
          } else {
            this.editContract = false;
          }
        }
      }
    );

    this.route.data.subscribe(
      (data: Data) => {
        this.contracts = data['contracts'];
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

  onAddContract() {
    this.router.navigate(['body','production', 'contracts', 'new']);
  }

  onViewContract(id:any){
    this.router.navigate([id], {relativeTo: this.route});
  }

}
