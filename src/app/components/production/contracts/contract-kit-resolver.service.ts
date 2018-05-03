import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ContractsService } from './contracts.service';
import { Observable } from 'rxjs/Observable';

interface Kit {
    contractRef: string;
    kitRef : string;
    CLIN: string;
    nodeRef: string;
    status: string;
}



@Injectable()
export class ContractKitResolver implements Resolve<Kit> {

    constructor(private contractsService: ContractsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Kit> | Promise<Kit> | Kit {
        return this.contractsService.getKit(route.params['kitId']);
    }
}