import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../country.model';
import { EnterpriseService } from '../../../../enterprise.service';

@Component({
  selector: 'app-country-item',
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.css']
})
export class CountryItemComponent implements OnInit {
  clicked = false;
  @Input() index: number;
  @Input() country: Country;
  constructor(private enterpriseService: EnterpriseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
