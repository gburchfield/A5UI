import { CustomersService } from '../customers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.css']
})
export class CustomersDetailComponent implements OnInit {
  customer: any;
  index: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private customersService: CustomersService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params["id"];
        this.customer = this.customersService.getCustomer(this.index);
      }
    )
  }

  onEditCustomer(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onEditLocations(){
    this.router.navigate(['locations-edit'], {relativeTo: this.route});
  }

}
