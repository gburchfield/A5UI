import { CustomersService } from '../customers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.css']
})
export class CustomersEditComponent implements OnInit {
  index: number;
  DBid: string;
  editMode= false;
  customerForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customersService: CustomersService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let customerName = '';
    let customerImgPath = '';
    let customerJsfParts = new FormArray([]);

    if(this.editMode){
      const customer = this.customersService.getCustomer(this.index);
      this.DBid = customer._id;
      console.log(this.DBid);
      console.log(customer);
      customerName = customer.name;
      customerImgPath = customer.imagePath;
      if(customer['jsfParts']){
        for (let jsfPart of customer.jsfParts) {
          customerJsfParts.push(
            new FormGroup({
              'name': new FormControl(jsfPart.name, Validators.required),
            })
          )
        }
      }
    }

    this.customerForm = new FormGroup({
      'name': new FormControl(customerName, Validators.required),
      'imagePath': new FormControl(customerImgPath, Validators.required),
      'jsfParts': customerJsfParts
    });


  }

  onSubmit(){
    if(this.editMode) {
      console.log(this.customerForm.value);
      this.customersService.updateCustomer(this.index, this.DBid, this.customerForm.value)
        .subscribe(
          (response) => console.log(response)
        )
    } else {
      // this.customersService.addProduct(this.customerForm.value)
      //   .subscribe(
      //     (response) => console.log(response)
      //   );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddJsfPart() {
    (<FormArray>this.customerForm.get('jsfParts')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
      })
    )
  }

  onRemoveJsfPart(index: number) {
    (<FormArray>this.customerForm.get('jsfParts')).removeAt(index);
  }


}
