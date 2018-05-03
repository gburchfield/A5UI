import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../enterprise.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [EnterpriseService]
})
export class LocationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
