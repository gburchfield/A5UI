import { Component, OnInit, Input } from '@angular/core';
import { Asset } from '../asset.model';
@Component({
  selector: 'app-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.css']
})
export class AssetItemComponent implements OnInit {
  @Input() asset:Asset;
  constructor() { }

  ngOnInit() {
  }

}
