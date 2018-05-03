import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../app.service';
import { MenuItem } from '../../components/a5ComponentModel/menuItem.model';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Input() menuItem: MenuItem;
  activeItem:String;
  constructor(private appService: AppService) { }

  onClick(){
    this.appService.menuItemSelected.emit(this.menuItem);
  }

  ngOnInit() {
    this.appService.menuItemSelected.subscribe(
      (selectedItem:MenuItem) => {
        this.activeItem = selectedItem.itemName;
      }
    );
  }

}
