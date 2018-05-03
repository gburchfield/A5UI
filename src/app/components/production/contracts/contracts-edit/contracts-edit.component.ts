import { ContractsService } from '../contracts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-edit',
  templateUrl: './contracts-edit.component.html',
  styleUrls: ['./contracts-edit.component.css']
})
export class ContractsEditComponent implements OnInit {
  contractName = '';
  editContract: any;
  //contractIndex: string;
  contractId: string;
  editMode= false;
  contractForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractsService: ContractsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // this.contractIndex = params['id'];
        // console.log(this.contractIndex);
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let contractUpdated = Date.now();
    let contractName = '';
    let contractNumber = '';
    let contractPopStartDate = '';
    let contractPopEndDate = '';
    

    if(this.editMode){
      
      this.editContract = this.contractsService.getSelectedContract();

      // this.contractsService.getContract(this.contractIndex).subscribe(
      //   (contractGet: any) => {
      //     this.editContract = contractGet
      //   },
      //   (error) => console.log(error)
      // )

      this.contractName = this.editContract.name;
      console.log(this.editContract);
      this.contractId = this.editContract._id;
      contractUpdated = this.editContract.updated;
      contractName = this.editContract.name;
      contractNumber = this.editContract.number;
      contractPopStartDate= this.editContract.popStartDate;
      contractPopEndDate= this.editContract.popEndDate;
    }

    this.contractForm = new FormGroup({
      'updated': new FormControl(contractUpdated),
      'name': new FormControl(contractName, Validators.required),
      'number': new FormControl(contractNumber, Validators.required),
      'popStartDate': new FormControl(contractPopStartDate, Validators.required),
      'popEndDate': new FormControl(contractPopEndDate, Validators.required)
    });
  }


  onSubmit() {
    
    if(this.editMode) {
      console.log(this.contractForm.value);
      this.contractsService.updateContract(this.contractId, this.contractForm.value)
        .subscribe(
          (response) => console.log(response)
        )
    } else {
        this.contractsService.addContract(this.contractForm.value)
        .subscribe(
          (response) => console.log(response)
        );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
