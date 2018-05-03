import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { A5Component } from '../components/a5ComponentModel/a5Component.model';
import { MenuItem } from '../components/a5ComponentModel/menuItem.model';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() appComp: A5Component;
  constructor(private appService:AppService) { }

  ngOnInit() {
  }

}
