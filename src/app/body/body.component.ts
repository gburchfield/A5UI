import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppService } from '../app.service';
import { A5Component } from '../components/a5ComponentModel/a5Component.model';
import { MenuItem } from '../components/a5ComponentModel/menuItem.model';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  private componentIndex = {
    'production': 0,
    'enterprise': 1,
    'process': 2
  }
  appComponent: A5Component;
  content: MenuItem
  constructor(private appService: AppService,
              private route: ActivatedRoute,
              private router: Router){}
  
  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          this.appComponent = this.appService.getComponent(this.componentIndex[this.route.snapshot.url[1].path]);
        }
      )

    this.appService.menuItemSelected.subscribe(
      (itemSelected:MenuItem) => {
        this.content = itemSelected;
      }
    )

  }

}
