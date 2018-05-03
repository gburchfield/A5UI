import { Contract } from './contract.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { backendURL } from '../../../global/variables';

@Injectable()
export class ContractsService{
    constructor(private http: Http){}
    contracts : any[];
    contractsChanged = new Subject<any>();
    selectedContract: any;
    selectedKit: any;
    //backendURL = "http://10.11.1.104:8080/api/";
    
    addContract(contract: any) {
        console.log("*****Adding Contract to DB*****");
        return this.http.post(backendURL + 'contracts', contract)
                .map(
                    (response: Response) => {
                        let data = response.json();
                        this.contractsChanged.next(data);
                    }
                );
    }

    getContracts() {
        return this.http.get(backendURL + 'contracts')
            .map(
                (response: Response) => {
                    let data = response.json();
                    this.contracts = data;
                    return data;
                }
            );
    }

    getContract(id: string) {
        console.log("*****GET CONTRACT " + id + " FROM DATABASE*****");
        this.http.get(backendURL + 'contracts/' + id)
            .subscribe(
                (response: Response) => {
                    let data = response.json();
                    this.selectedContract = data;
                }
            );
        for(var contract of this.contracts){
            if(contract._id === id){
                return contract;
            }
        }
    }
    
    getSelectedContract() {
        console.log(this.selectedContract);
        return this.selectedContract;
    }


    updateContract(DBid: string, newContract: any) {
        //this.contracts[index] = newContract;
        const url = backendURL + 'contracts/' + DBid;
        console.log(url);
        return this.http.put(url, newContract)
                .map(
                    (response: Response) => {
                        let data = response.json();
                        this.contractsChanged.next(data);
                    }
                );;
    }

    deleteContract(id: string) {
        const url = backendURL + 'contracts/' + id;
        console.log(url);
        //this.contracts.splice(index, 1);
        return this.http.delete(url)
                .map(
                    (response: Response) => {
                        this.contractsChanged.next('deleted');
                    }
                );
    }

    addKit(kit: any) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('newNode', 'true');
        console.log("*****Adding Kit to DB*****")
        console.log(kit);
        return this.http.post(backendURL + 'kits', kit, {search: params});
    }

    getKit(id: string){
        console.log("*****GET KIT " + id + " FROM DATABASE*****");
        this.http.get(backendURL + 'kits/' + id)
            .subscribe(
                (response: Response) => {
                    let data = response.json();
                    this.selectedKit = data;
                    
                }
            );
        for(var kit of this.selectedContract.kits){
            if(kit._id === id){
                //this.selectedKit = kit;
                return kit;
            }
        }
    }

    getSelectedKit(){
        console.log("*****Get Selected Kit from Service Cache*****");
        return this.selectedKit;
    }

    updateNode(id: any, node: any) {
        const url = backendURL + 'nodes/' + id;
        console.log('*****Updating Node on DB*****');
        console.log(node);
        return this.http.put(url, node);
    }

    updateKit(id: any, kit: any, node: any) {
        if(node != null){
            this.updateNode(kit.nodeRef, node).subscribe(
                (response) => {
                    console.log("*****RESPONSE FROM NODE PUT*****");
                    console.log(response);
                }
            );
        }
        const url = backendURL + 'kits/' + id;
        console.log("*****Updating Kit on DB*****")
        console.log(kit);
        return this.http.put(url, kit)
            .map(
                    (response: Response) => {
                        let data = response.json();
                        console.log(data);
                        this.selectedKit = data;
                        return data;
                    }
            );
    }


    deleteKit(id:any, kit: any){
        let params: URLSearchParams = new URLSearchParams();
        params.set('newNode', kit.newNode);
        const url = backendURL + 'kits/' + id;
        console.log("*****DELETING Kit on DB*****");
        console.log(kit);
        return this.http.delete(url, {search: params});
    }

    addAssets(assets: any){
        const url = backendURL + 'customerAssets';
        console.log("*****POSTING Customer Assets to DB*****");
        console.log(assets);
        return this.http.post(url, assets);
    }
    
    deleteAsset(id:any, kitId:any, nodeId: any){
        const url = backendURL + 'customerAssets/' + id;
        console.log("*****DELETING Customer Asset from DB*****");
        return this.http.delete(url, { params: {kit:kitId,node:nodeId} });
    }

    dateToString(inputDate) {
        let localDate = new Date(inputDate);
        let localTime = localDate.getTime();
        let localOffset = localDate.getTimezoneOffset() * 60000;
        return new Date(localTime + localOffset);
    }
    

    // getCustomerLocation(customerIndex: number, locationIndex: number) {
    //     const location = this.customers[customerIndex].locations[locationIndex];
    //     console.log("getCustomerLocation() called, returned:")
    //     console.log(location);
    //     return location;
    // }

    // updateLocation(customerIndex, locationIndex, newLocation: any) {
    //     this.customers[customerIndex].locations[locationIndex].name = newLocation.name;
    //     this.customers[customerIndex].locations[locationIndex].locationType = newLocation.locationType;
    //     this.customers[customerIndex].locations[locationIndex].city = newLocation.city;
    //     this.customers[customerIndex].locations[locationIndex].state = newLocation.state;
    //     const id = this.customers[customerIndex].locations[locationIndex]._id;
    //     const url = this.backendURL + 'locations/' + id;
    //     console.log(newLocation);
    //     return this.http.put(url, newLocation)
    // }

    // deleteLocation(customerIndex, locationIndex) {
    //     const id = this.customers[customerIndex].locations[locationIndex]._id;
    //     const url = this.backendURL + 'locations/' + id;
    //     console.log(url);
    //     this.customers[customerIndex].locations.splice(locationIndex, 1);
    //     //this.productsChanged.next(this.products.slice());
    //     return this.http.delete(url);
    // }

}