import { EventEmitter } from "@angular/core";
import { A5Component } from "./components/a5ComponentModel/a5Component.model";
import { MenuItem } from "./components/a5ComponentModel/menuItem.model";
export class AppService {
    //START TEMP DATA
    a5Component: A5Component[] = [
        new A5Component("Production",[
                new MenuItem("Home","home"),
                new MenuItem("Contracts Management","contracts"),
                new MenuItem("Contracts Execution", "execution/In Progress"),
                new MenuItem("Customers", "customers")
            ]),
        new A5Component("Enterprise",[
            new MenuItem("Home", "home"),
            new MenuItem("Location View", "location/country"),
        ]),
        new A5Component("Process",[
            new MenuItem("Home", "home"),
            new MenuItem("ALIS Products", "products"),
            new MenuItem("Execution Process", "execution")
        ])
    ];

    //END TEMP DATA
    getComponent(index: number){
        return this.a5Component[index];
    }

    componentSelected = new EventEmitter<A5Component>();
    menuItemSelected = new EventEmitter<MenuItem>();
}