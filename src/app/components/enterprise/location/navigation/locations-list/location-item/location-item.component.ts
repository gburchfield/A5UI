import { Component, OnInit, Input} from '@angular/core';
import { Location } from '../location.model';
import { EnterpriseService } from '../../../../enterprise.service';
@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {
  @Input() index: number;
  @Input() location: Location;
  constructor(private enterpriseService: EnterpriseService) { }

  ngOnInit() {
  }
  onClick(){
    this.enterpriseService.locationSelected.emit(this.location);
  }
}
