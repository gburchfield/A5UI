import { CustomersService } from '../customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  customers: any[];
  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(
      (customers: any[]) => this.customers = customers,
      (error) => console.log(error)
    )

    console.log(this.customers);
  }

}
