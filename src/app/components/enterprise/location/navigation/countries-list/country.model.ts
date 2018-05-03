import { Location } from '../locations-list/location.model';
export class Country {
    constructor(public name: string, public imagePath: string, public locations:[Location]) {}
}