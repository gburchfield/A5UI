import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ExecutionService } from '../execution.service';
import { Observable } from 'rxjs/Observable';

interface Kit {
    contractRef: any;
    kitRef : any;
    CLIN: string;
    nodeRef: any;
    status: string;
}



@Injectable()
export class ExecutionAssetResolver implements Resolve<Kit> {

    constructor(private executionService: ExecutionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Kit> | Promise<Kit> | Kit {
        return this.executionService.getKit(route.params.kitId);
    }
}