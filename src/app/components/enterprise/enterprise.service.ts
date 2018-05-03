import { HttpParams } from '@angular/common/http';
import { Country } from './location/navigation/countries-list/country.model';
import { Location } from './location/navigation/locations-list/location.model';
import { Node } from './location/navigation/nodes-list/node.model';
import { Asset } from './location/asset-list/asset.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { backendURL } from '../../global/variables';

@Injectable()
export class EnterpriseService{
    constructor(private http: Http){}
    countries: any[];
    //backendURL = "http://10.11.1.104:8080/api/";

    getCountries(){
        return this.http.get(backendURL + 'countries')
            .map(
                (response: Response) => {
                    const data = response.json();
                    this.countries = data;
                    return data;
                }
            );
        //return this.countries.slice();
    };

    getCountry(index:number) {
        //this.http.get('192.168.56.101:8080/api/countries');
        return this.countries[index];
    }

    getLocation(countryIndex:number, locationIndex:number) {
        return this.countries[countryIndex].locations[locationIndex];
    }

    getNode(countryIndex: number, locationIndex: number, nodeIndex: number) {
        const nodeDbId = this.countries[countryIndex].locations[locationIndex].nodes[nodeIndex]._id;

        const url = backendURL + "nodes/" + nodeDbId;

        return this.http.get(url)
            .map(
                (response: Response) => {
                    const data = response.json();
                    console.log(data);
                    return data;
                }
            )
        
    }
    
    getArrayOfNodes(Nodes:[string]){
        const url = backendURL + "nodes";
        let params = {"nodes": JSON.stringify(Nodes)};
        console.log(params);
        return this.http.get(url,{params:params})
            .map((response: Response)=>{
                const data = response.json();
                console.log(data);
                return data;
            });
    }
    
    countrySelected = new EventEmitter<Country>();
    locationSelected = new EventEmitter<Location>();
    nodeSelected = new EventEmitter<Node>();

}