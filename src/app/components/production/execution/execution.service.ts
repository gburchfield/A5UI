import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { backendURL } from '../../../global/variables';

@Injectable()
export class ExecutionService{
    kits = [];
    kit:any;
    asset:any;
    constructor(private http: Http){}

    getKits(status?:string){
        console.log("*****GET KITS FROM DATABASE*****");
        return this.http.get(backendURL + 'kits', { params: { kitStatus: status } })
            .map(
                (response: Response) => {
                    let data = response.json();
                    this.kits = data;
                    return data;
                }
            );
    }

    getKitId(index:number){
        let buffer = {kitId: '', nodeId: ''};
        buffer.kitId = this.kits[index]._id;
        buffer.nodeId = this.kits[index].nodeRef._id;
        return buffer;
    }

    getKit(id:string){
        return this.http.get(backendURL + 'kits/' + id)
            .map(
                (response: Response) => {
                    let data = response.json();
                    this.kit = data;
                    return data;
                }
            );
    }
    
    getAssetId(index: number){
        return this.kit.assets[index]._id;
    }

    getAsset(id:string){
        return this.http.get(backendURL + 'customerAssets/' + id)
            .map(
                (response: Response) => {
                    let data = response.json();
                    this.asset = data;
                    return data;
                }
            );
    }

    updateAsset(id: string, assetUpdates: any) {
        const url = backendURL + 'customerAssets/' + id;
        console.log(url);
        return this.http.put(url, assetUpdates)
                .map(
                    (response: Response) => {
                        let data = response.json();
                    }
                );;
    }
            
    updateNode(id: any, node: any) {
        const url = backendURL + 'nodes/' + id;
        console.log('*****Updating Node on DB*****');
        console.log(node);
        return this.http.put(url, node);
    }

    dateToString(inputDate) {
        let localDate = new Date(inputDate);
        let localTime = localDate.getTime();
        let localOffset = localDate.getTimezoneOffset() * 60000;
        return new Date(localTime + localOffset);
    }

    getExecutionProcess(){
    let executionProcess = [
    {
      phaseName: "Assembly",
      tasks: [
        {
          taskName: "Assembly Hardware",
          description:"Pulling parts from stock and assemblying the asset according the released engineering drawings.  A user in the 'Assembly' group will press start on the asset that they are working on to trigger the start of this task and record the date/time the task began, when assembly is copmlete the user will select a complete button on the asset.",
          averageDuration: 0
        },
        {
          taskName: "Capture Serial Number",
          averageDuration: 0
        },
        {
          taskName: "Handoff to Engineering",
          averageDuration: 0
        }]
    },
    {
      phaseName: "Configuration",
      tasks: [
        {
          taskName: "Assign ALIS Node Name",
          averageDuration: 0
        },
        {
          taskName: "Install Base Image",
          averageDuration: 0
        },
        {
          taskName: "Install ALIS",
          averageDuration: 0
        },
        {
          taskName: "Information Assurance",
          averageDuration: 0
        },
        {
          taskName: "Quality Assurance",
          averageDuration: 0
        }]
    },
    {
      phaseName: "Deployment",
      tasks: [
        {
          taskName: "Submit DTS (Delivery To Shipping)",
          averageDuration: 0
        },
        {
          taskName: "Submit eShipper",
          averageDuration: 0
        },
        {
          taskName: "DRR (Deployment Readiness Review)",
          averageDuration: 0
        }]
    },
    {
      phaseName: "Shipping",
      tasks: [
        {
          taskName: "Package Hardware",
          averageDuration: 0
        },
        {
          taskName: "Move to Shipping Dock",
          averageDuration: 0
        },
        {
          taskName: "Handoff to Engineering",
          averageDuration: 0
        }]
    }];
    return executionProcess;
  }

}