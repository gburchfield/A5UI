import { CustomersService } from '../../../customers/customers.service';
import { ContractsService } from '../../contracts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kits-edit',
  templateUrl: './kits-edit.component.html',
  styleUrls: ['./kits-edit.component.css'],
})
export class KitsEditComponent implements OnInit {
  queryForm: FormGroup;
  currentContract: any ;
  currentKit: any;
  nodeForm = {};
  kitForm = {};
  
  options: any[];
  countries= {};
  countryOptions= [];
  countryLocations= {};
  locationNodes = {};
  countrySelected = false;
  countryOwnerSelected = false;
  locationOptions = [];
  locationSelected = false;
  newNodeSelected = false;
  nodeExists = false;
  nodeOptions = [];
  jsfPartOptions = [];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractsService: ContractsService,
              private customersService: CustomersService,) {
                this.initForm();
                this.kitRefChange();
                this.countryChange();
                this.locationChange();
                this.newNodeChanged();
                this.countryOwnerChange();
                
              }


  ngOnInit() {
    
    
    this.currentContract = this.contractsService.getSelectedContract();
    console.log('Currently Editing Contract: ');
    console.log(this.currentContract);
    this.setNodeFormValues('name', this.currentContract.name);
    this.setKitFormValues('contractRef', this.currentContract._id);

    this.customersService.getCustomers().subscribe(
      (customers: any[]) => {
        this.options = customers;
        for(let country of this.options) {
          this.countries[country.name] = country;
          this.countryOptions.push(country);
          this.countryLocations[country.name] = {};
          for(let location of country.locations) {
            this.countryLocations[country.name][location.name] = location;
            this.locationNodes[location.name] = {};
            for(let node of location.nodes){
              this.locationNodes[location.name][node.name] = node;
            }
          };
        }
        console.log(this.countryLocations);
        console.log(this.locationNodes);
        

      },
      (error) => console.log(error)
    );

  
  }

  private initForm(){
      this.currentKit = this.contractsService.getSelectedKit();
      console.log(this.currentKit);
      this.countrySelected = true;
      this.locationSelected = false; //dont show newNode selection
      let kitKitRef = this.currentKit.kitRef;
      let kitCLIN = this.currentKit.clin;
      let kitStartPOP = this.contractsService.dateToString(this.currentKit.startPOP).toISOString();
      let kitEndPOP = this.contractsService.dateToString(this.currentKit.endPOP).toISOString();
      let kitCFUDate = this.contractsService.dateToString(this.currentKit.cfuDate).toISOString();
      let kitCountry = this.currentKit.nodeRef.location.country.name;
      this.locationOptions = this.customersService.getCountryLocations(this.currentKit.nodeRef.location.country.name);
      let kitLocation = this.currentKit.nodeRef.location._id;
      this.nodeOptions = this.customersService.getLocationsNodes(this.currentKit.nodeRef.location.name);
      let newNode = this.currentKit.newNode;
      this.nodeExists = !this.currentKit.newNode;
      this.newNodeSelected = this.currentKit.newNode;
      
        let kitSquadName = this.currentKit.nodeRef.squadName;
        let kitCountryOwner = 'default'; //Need to figure out how to get this, for now just dot show this option
        this.jsfPartOptions = this.customersService.getJsfParts(this.currentKit.nodeRef.location.country.name);
        this.countryOwnerSelected = true;
        let kitJsfPartOwner = this.currentKit.nodeRef.jsfPart;
        console.log(kitJsfPartOwner);
        console.log(this.currentKit.nodeRef);
        let kitNodeRef = this.currentKit.nodeRef._id;

    this.queryForm = new FormGroup({
      'kitRef': new FormControl(kitKitRef, Validators.required),
      'clin': new FormControl(kitCLIN, Validators.required),
      'startPOP': new FormControl(kitStartPOP.slice(0,10), Validators.required),
      'endPOP': new FormControl(kitEndPOP.slice(0,10), Validators.required),
      'cfuDate': new FormControl(kitCFUDate.slice(0,10), Validators.required),
      'country': new FormControl(kitCountry, Validators.required),
      'location': new FormControl(kitLocation, Validators.required),
      'newNode': new FormControl(newNode, Validators.required),
      'nodeRef': new FormControl(kitNodeRef),
      'squadName': new FormControl(kitSquadName),
      'countryOwner': new FormControl(kitCountryOwner),
      'jsfPartOwner': new FormControl(kitJsfPartOwner)
    });
  }

  kitRefChange() {
    const kitRefControl = this.queryForm.get('kitRef');
    kitRefControl.valueChanges.forEach(
      (value: string) => {
        console.log(value);
        console.log(this.queryForm.value);
      }
    );
  }

  onSubmit(){
    this.setNodeFormValues('name', ' Kit '+this.queryForm.value.kitRef);
    this.setNodeFormValues('squadName', this.queryForm.value.squadName);
    this.setNodeFormValues('location', this.queryForm.value.location);
    this.setNodeFormValues('jsfPart', this.queryForm.value.jsfPartOwner);
    this.setKitFormValues('kitRef', this.queryForm.value.kitRef);
    this.setKitFormValues('clin', this.queryForm.value.clin);

    if(this.nodeExists){
      this.setKitFormValues('nodeRef', this.queryForm.value.nodeRef);
    } else {
      this.setKitFormValues('nodeRef', this.currentKit.nodeRef._id);
    }

        console.log('*****SUBMITING KIT UPDATE TO DB*****');
        console.log(this.kitForm);

        this.contractsService.updateKit(this.currentKit._id, this.kitForm, this.nodeForm)
        .subscribe(
          (response) => console.log(response)
        );

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  countryChange() {
    const countryControl = this.queryForm.get('country');
    countryControl.valueChanges.forEach(
      (value: any) => {
        console.log('The Value is: ' + value);
        if(value != "default"){
          const countryLocations = this.countryLocations[value];
          console.log(countryLocations);
          this.countrySelected = true;
          this.locationOptions = [];
          for(let location in countryLocations){
            this.locationOptions.push(this.countryLocations[value][location]);
            console.log(location);
          }
        } else{
          this.countrySelected = false;
          this.locationSelected = false;
          this.locationOptions = [];
        }
      }
    );
  }

  setNodeFormValues(property: string, val: string){
    if(property === 'name'){
      if(this.nodeForm[property] != null){
        this.nodeForm[property] = this.nodeForm[property] + val;
      } else {
        this.nodeForm[property] = val;
      }
    } else{
      this.nodeForm[property] = val;
    }
    console.log(this.nodeForm);
  }

  setKitFormValues(property: string, val: any){
    if(property === 'kitRef'){
      this.kitForm[property] = val;
      console.log(this.kitForm);
    } else{
      this.kitForm[property] = val;
      console.log(this.kitForm);
    }
  }

  locationChange() {
    const locationControl = this.queryForm.get('location');
    locationControl.valueChanges.forEach(
      (value: string) => {
        if(value != "default"){
          this.locationSelected = true;
          console.log(value);
          const locationNodes = this.locationNodes[value];
          console.log(locationNodes);
          this.nodeOptions = [];
          for(let node in locationNodes){
            this.nodeOptions.push(this.locationNodes[value][node]);
            console.log(node);
          }
        } else{
          this.locationSelected = false;
          this.nodeOptions = [];
        }
      }
    );
  }

  newNodeChanged() {
    const newNodeControl = this.queryForm.get('newNode');
    newNodeControl.valueChanges.forEach(
      (value: string) => {
        if(value != "default"){
          if(value === 'true'){
            this.newNodeSelected = true;
            //this.initNodeForm();
          } else {
            this.nodeExists = true;
            const locationNodes = this.locationNodes[this.queryForm.value.location];
            console.log(locationNodes);
            this.nodeOptions = [];
            for(let node in locationNodes){
              this.nodeOptions.push(this.locationNodes[this.queryForm.value.location][node]);
              console.log(node);
            }
          }
        } else{
          console.log("make a decision");
          this.newNodeSelected = false;
        }
      }
    );
  }

  countryOwnerChange() {
    const countryOwnerControl = this.queryForm.get('countryOwner');
    countryOwnerControl.valueChanges.forEach(
      (value:string) => {
        if(value != "default"){
          this.countryOwnerSelected = true;
          this.jsfPartOptions = []; 
          console.log(value);
          console.log(this.countries[value].jsfParts);
          for(let jsfPart of this.countries[value].jsfParts){
            this.jsfPartOptions.push(jsfPart);
            console.log(jsfPart);
          }
        } else {
          this.countryOwnerSelected = false;
          this.jsfPartOptions = [];
        }


      }
    );
  }

}
