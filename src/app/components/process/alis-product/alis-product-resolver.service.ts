import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AlisProductService } from './alis-product.service';
import { Observable } from 'rxjs/Observable';

interface Product {
    name:string,
    partNum: string,
    IUID: string,
    assetType:string,
    assetSubType:string,
    classification:string,
    childAssets:[{
        name: string,
        partNum: string,
        cage: string,
        mfg: string,
        modelNum: string,
        venPartNum: string,
        childAssets:[{
            name: string,
            partNum: string,
            cage: string,
            mfg: string,
            modelNum: string,
            venPartNum: string
        }]
    }]
}



@Injectable()
export class AlisProductResolver implements Resolve<Product> {

    constructor(private alisProductService: AlisProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {
        return this.alisProductService.getProduct(route.params["id"]);
    }
}