import { CustomersService } from './customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [CustomersService]
})
export class CustomersComponent implements OnInit {

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
  }

}
