export class AlisProduct {
    constructor(public _id: number,
                public name: string,
                public partNum: string,
                public IUID: string,
                public childAssets:[{
                    name: string,
                    partNum: string,
                    IUID: string,
                    childAssets:[{
                        name: string,
                        partNum: string
                    }]
                }]) {}
}