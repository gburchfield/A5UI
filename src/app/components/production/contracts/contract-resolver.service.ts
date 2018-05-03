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

interface Contract {
    updated: Date;
    name: string;
    number: string;
    popStartDate: Date;
    popEndDate: Date;
    kits: Array<Kit>;
}

@Injectable()
export class ContractResolver implements Resolve<Contract> {

    constructor(private contractsService: ContractsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contract> | Promise<Contract> | Contract {
        return this.contractsService.getContract(route.params['id'])
    }
}