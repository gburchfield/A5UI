import { Asset } from '../../asset-list/asset.model';
export class Node{
    constructor(public _id:string, public name:string, public squadName:string, public assets:[Asset]){}
}