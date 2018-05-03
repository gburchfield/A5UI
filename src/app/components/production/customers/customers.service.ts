import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { backendURL } from '../../../global/variables';

@Injectable()
export class CustomersService{
    constructor(private http: Http){}
    customers : any[];
    countryLocations = {};
    locationNodes = {};
    countryJsfParts = {};
    //backendURL = "http://10.11.1.104:8080/api/";
    customersChanged = new Subject<any>();
    customerDbUpdate = {
        'name': '',
        'imagePath': ''
    }
    
    getCustomers() {
        return this.http.get(backendURL + 'countries')
            .map(
                (response: Response) => {
                    const data = response.json();
                    this.customers = data;
                    for(let country of this.customers) {
                        this.countryLocations[country.name] = [];
                        for(let location of country.locations) {
                            this.countryLocations[country.name].push(location);
                            this.locationNodes[location.name] = [];
                            for(let node of location.nodes){
                            this.locationNodes[location.name].push(node);
                            }
                        }
                        this.countryJsfParts[country.name] = [];
                        for(let jsfPart of country.jsfParts){
                            this.countryJsfParts[country.name].push(jsfPart);
                        }
                    };
                    return data;
                }
            );
    }

    getCustomer(index: number) {
        console.log("getCustomer() called, returned: ");
        console.log(this.customers[index]);
        return this.customers[index];
    }

    getJsfParts(country: string){
        return this.countryJsfParts[country];
    }

    getCountryLocations(country: string){
        return this.countryLocations[country];
    }

    getLocationsNodes(location: string){
        return this.locationNodes[location];
    }

    updateCustomer(index: number, DBid: string, newCustomer: any) {
        this.customers[index] = newCustomer;
        //this.customersChanged.next(this.customers.slice());
        const url = backendURL + 'countries/' + DBid;
        console.log(url);
        //this.customerDbUpdate.name = newCustomer.name;
        //this.customerDbUpdate.imagePath = newCustomer.imagePath;
        return this.http.put(url, newCustomer);
    }

    addLocation(customerIndex, location: any) {
        this.customers[customerIndex].locations.push(location);
        return this.http.post(backendURL + 'locations', location);
    }

    getCustomerLocation(customerIndex: number, locationIndex: number) {
        const location = this.customers[customerIndex].locations[locationIndex];
        console.log("getCustomerLocation() called, returned:")
        console.log(location);
        return location;
    }

    updateLocation(customerIndex, locationIndex, newLocation: any) {
        this.customers[customerIndex].locations[locationIndex].name = newLocation.name;
        this.customers[customerIndex].locations[locationIndex].locationType = newLocation.locationType;
        this.customers[customerIndex].locations[locationIndex].city = newLocation.city;
        this.customers[customerIndex].locations[locationIndex].state = newLocation.state;
        const id = this.customers[customerIndex].locations[locationIndex]._id;
        const url = backendURL + 'locations/' + id;
        console.log(newLocation);
        return this.http.put(url, newLocation)
    }

    deleteLocation(customerIndex, locationIndex) {
        const id = this.customers[customerIndex].locations[locationIndex]._id;
        const url = backendURL + 'locations/' + id;
        console.log(url);
        this.customers[customerIndex].locations.splice(locationIndex, 1);
        //this.productsChanged.next(this.products.slice());
        return this.http.delete(url);
    }

}