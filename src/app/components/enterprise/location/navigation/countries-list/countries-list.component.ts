import { Component, OnInit } from '@angular/core';
import { Country } from './country.model';
import { EnterpriseService } from '../../../enterprise.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {
  countries: Country[];
  constructor(private enterpriseService:EnterpriseService) { }

  ngOnInit() {
    this.enterpriseService.getCountries().subscribe(
      (countries: any[]) => this.countries = countries,
      (error) => console.log(error)
    )

    //this.countries = this.enterpriseService.getCountry();
    console.log(this.countries);
  }

}
