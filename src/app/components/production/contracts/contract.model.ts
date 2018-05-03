
export class Contract {
    constructor(public updated: Date,
                public _id: string,
                public name: string, 
                public number: string, 
                public popStartDate: Date, 
                public popEndDate: Date, 
                public kits:[any]) {}
}