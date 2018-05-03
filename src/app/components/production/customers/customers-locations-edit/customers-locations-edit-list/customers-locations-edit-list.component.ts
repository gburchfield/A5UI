import { CustomersService } from '../../customers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-locations-edit-list',
  templateUrl: './customers-locations-edit-list.component.html',
  styleUrls: ['./customers-locations-edit-list.component.css']
})
export class CustomersLocationsEditListComponent implements OnInit {
  customerIndex: number;
  locations: any[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customersService: CustomersService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.customerIndex = +params['id'];
        this.locations = this.customersService.getCustomer(this.customerIndex).locations;
      }
    )
  }

  onLocationEdit(customerIndex: number, locationIndex:number){
    this.router.navigate([customerIndex,locationIndex], {relativeTo: this.route})
  }

  onDeleteLocation(customerIndex: number, locationIndex: number){
    this.customersService.deleteLocation(customerIndex, locationIndex).subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
