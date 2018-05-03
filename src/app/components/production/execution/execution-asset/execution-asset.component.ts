import { Response } from '@angular/http';
import { ExecutionService } from '../execution.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-execution-asset',
  templateUrl: './execution-asset.component.html',
  styleUrls: ['./execution-asset.component.css']
})
export class ExecutionAssetComponent implements OnInit {
  asset: any;
  assetForm: FormGroup;
  nodeName: string;
  phase: string;

  constructor(private route: ActivatedRoute, private router: Router, private executionService: ExecutionService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.asset = data['asset'];
        this.nodeName = this.asset.nodeName;
        console.log(data['asset']);
      }
    );
    this.route.params.subscribe(
      (params: Params) => {
        this.phase = params['phase'];
      }
    );
    this.initForm();
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  initForm(){
    if(this.phase === 'Assembly'){
      let assetSerialNum = this.asset.serialNum;
      let assetIUIDsn = this.asset.IUIDsn;
      this.assetForm = new FormGroup({
        'serialNum': new FormControl(assetSerialNum, Validators.required),
        'IUIDsn': new FormControl(assetIUIDsn, Validators.required),
      });
    }
    if(this.phase === 'Configuration'){
      let assetNodeName = this.asset.nodeName;
      this.assetForm = new FormGroup({
        'nodeName': new FormControl(assetNodeName, Validators.required),
      });
    }
  }

  onSubmit(){
    if(this.phase === 'Assembly'){
      this.asset.serialNum = this.assetForm.value.serialNum;
      this.asset.IUIDsn = this.assetForm.value.IUIDsn;
      this.asset.log.build[0].tasks[1].endDate = Date.now();
    }
    if(this.phase === 'Configuration'){
      this.asset.nodeName = this.assetForm.value.nodeName;
      this.asset.log.build[1].tasks[0].endDate = Date.now();
    }
    this.executionService.updateAsset(this.asset._id, this.asset)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
