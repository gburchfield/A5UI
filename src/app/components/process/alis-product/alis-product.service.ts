import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { backendURL } from '../../../global/variables';

@Injectable()
export class AlisProductService {
    constructor(private http: Http) {}
    products: any[];
    selectedProduct: any;
    //backendURL = "http://10.11.1.104:8080/api/";
    productsChanged = new Subject<any>();

    addProduct(product:any) {
        this.products.push(product);
        this.productsChanged.next(this.products.slice());
        return this.http.post(backendURL + 'assets', product);
    }

    getProducts(){
        return this.http.get(backendURL + 'assets').map(
            (response: Response) => {
                const data = response.json();
                this.products = data;
                console.log(typeof(this.products));
                return data;
            }
        )
        
    }

    getProductsArray(){
            console.log("*****Get Products Array Called*****");
            console.log(this.products);
            return this.products;
    }

    getProduct(id: number){
        // return this.products[index];
        return this.http.get(backendURL + 'assets/' + id).map(
            (response: Response) => {
                const data = response.json();
                this.selectedProduct = data;
                return data;
            }
        )
    }

    getSelectedProduct() {
        return this.selectedProduct;
    }

    updateProduct(id: string, newProduct:any) {
        //this.products[index] = newProduct;
        //this.productsChanged.next(this.products.slice());
        const url = backendURL + 'assets/' + id;
        console.log("*****Updating Product On DB*****");
        return this.http.put(url, newProduct)
    }

    deleteProduct(id: number) {
        const url = backendURL + 'assets/' + id;
        console.log(url);
        //this.products.splice(index, 1);
        //this.productsChanged.next(this.products.slice());
        return this.http.delete(url);
    }

}