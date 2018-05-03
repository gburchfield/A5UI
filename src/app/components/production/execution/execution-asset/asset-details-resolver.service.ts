import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ExecutionService } from '../execution.service';
import { Observable } from 'rxjs/Observable';

interface Asset {
    nodeHome: string;
    kitRef : string;
    name: string;
    partNum: string;
    IUID: string;
    childAssets: any;
    serialNum: string;
    IUIDsn: string;
    nodeName: string;
}



@Injectable()
export class ExecutionAssetDetailsResolver implements Resolve<Asset> {

    constructor(private executionService: ExecutionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Asset> | Promise<Asset> | Asset {
        return this.executionService.getAsset(route.params.assetId);
    }
}