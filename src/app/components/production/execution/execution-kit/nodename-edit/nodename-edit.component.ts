import { Response } from '@angular/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExecutionService } from '../../execution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nodename-edit',
  templateUrl: './nodename-edit.component.html',
  styleUrls: ['./nodename-edit.component.css']
})
export class NodenameEditComponent implements OnInit {
  @Input() kit: any;
  alisNode: string;
  isAlisNode = false;
  isSubmitButton = false;
  nodeForm: FormGroup;
  nodeNameGenerated = false;
  nodeNames = [];
  assetsForm: FormGroup;
  assets = [];

  constructor(private router: Router, private route: ActivatedRoute, private executionService: ExecutionService) {
     
   }

  ngOnInit() {
    console.log(this.kit);
    this.typeOfNode();
    this.createAssetsForm();
  }

  typeOfNode(){
    for(let asset of this.kit.assets){
      if(asset.assetSubType.includes('SOU')){
        this.alisNode = 'SOU';
        this.initNodeForm();
        this.onNodeNameChange();
        this.isAlisNode = true;
      }
    }
  }

  onNodeNameChange(){
    const nodeNameControl = this.nodeForm.get('nodeName');
    nodeNameControl.valueChanges.forEach(
      (value: string) => {
        console.log(value);
      }
    );
  }

  initNodeForm(){
    let nodeName = ''
    if(this.kit.nodeRef.nodeNames.length != 0){
      for(let kitNodeName of this.kit.nodeRef.nodeNames){
        if(kitNodeName.nodeType ==='SOU-U'){
          nodeName = kitNodeName.nodeName;
        }
      }
    }
    this.nodeForm = new FormGroup({
      'nodeName': new FormControl(nodeName,Validators.required)
    });
  }

  onNodeFormSubmit(){
    let nodeNameLength: Number;
    if(this.alisNode === 'SOU'){
      nodeNameLength = 10;
    }
    if(this.nodeForm.value.nodeName.length === nodeNameLength){
      console.log('Generate Node name for: ' + this.nodeForm.value.nodeName);
      this.generateNodeName(this.nodeForm.value.nodeName);
    } else {
      console.log('Node Name must be ' + nodeNameLength + ' digits long;');
    }
    
  }

  generateNodeName(nodeNameInput: String){
    if(this.alisNode === 'SOU'){
      this.nodeNames = [];
      let firstFour = nodeNameInput.substr(0,4);
      let lastFour = nodeNameInput.substr(6,4);
      this.nodeNames.push({nodeType:'SOU-U',nodeName:nodeNameInput});
      this.nodeNames.push({nodeType:'SOU-U Staging Server',nodeName:firstFour+'UNIER'});
      this.nodeNames.push({nodeType:'SOU-C (Secret)',nodeName:firstFour+'C1'+lastFour});
      this.nodeNames.push({nodeType:'SOU-C (Secret SAR)',nodeName:firstFour+'C2'+lastFour});
      this.nodeNames.push({nodeType:'SOU-C (System High)',nodeName:firstFour+'C4'+lastFour});
      this.nodeNameGenerated = true;
    }
  }

  createAssetsForm(){
    this.assets = [];
    for(let asset of this.kit.assets){
      if(asset.assetType != 'ALIS Node' && !asset.nodeName){
        this.assets.push(
          {
            '_id': asset._id,
            'name': asset.name,
            'nodeName': ''
          }
        );
      }
    }
    this.isSubmitButton = true;
  }

  onSubmitNodeNames(){
    console.log(this.nodeNames);
    if(this.kit.nodeRef.nodeNames.length === 0){
      this.executionService.updateNode(this.kit.nodeRef._id,{nodeNames:this.nodeNames}).subscribe(
        (response:Response) => {
          console.log(response);
        }
      );
    }
    for(let asset of this.kit.assets){
      if(asset.assetType ==="ALIS Node" && !asset.nodeName){
        asset['nodeName'] = this.nodeForm.value.nodeName.substr(0,4);
        for(let phase of asset.log.build){
          if(phase.phaseName ==="Configuration"){
            for(let task of phase.tasks){
              if(task.taskName === "Assign ALIS Node Name"){
                task.startDate = Date.now();
                task.endDate = Date.now();
              }
            }
          }
        }
        console.log(asset);
        this.executionService.updateAsset(asset._id,asset).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    }
    console.log(this.assets);
    for(let asset of this.assets){
      if(asset.nodeName.length !=0){
        this.executionService.updateAsset(asset._id,{nodeName:asset.nodeName}).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    }
  }

}
