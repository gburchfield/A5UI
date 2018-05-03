import { CustomersService } from '../customers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-locations-edit',
  templateUrl: './customers-locations-edit.component.html',
  styleUrls: ['./customers-locations-edit.component.css']
})
export class CustomersLocationsEditComponent implements OnInit {
  customerIndex: number;
  customerName: any;
  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customersService: CustomersService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.customerIndex = +params['id'];
        this.customerName = this.customersService.getCustomer(this.customerIndex).name;
      }
    )
  }


  

}
