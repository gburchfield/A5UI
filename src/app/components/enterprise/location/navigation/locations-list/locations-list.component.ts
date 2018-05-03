import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from './location.model';
import { Country } from '../countries-list/country.model';
import { EnterpriseService } from '../../../enterprise.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {
  index: number;
  country: Country;
  locations: Location[];
  constructor(private enterpriseService: EnterpriseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['countryId'];
        this.country = this.enterpriseService.getCountry(this.index);
        this.locations = this.country.locations;
      }
    );

    this.enterpriseService.countrySelected.subscribe(
      (country: Country) => {
          this.locations = country.locations;
      }
    );
  }

}
