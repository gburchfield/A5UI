import { ExecutionService } from '../execution.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'app-execution-kit',
  templateUrl: './execution-kit.component.html',
  styleUrls: ['./execution-kit.component.css']
})
export class ExecutionKitComponent implements OnInit, AfterViewChecked {
  assets = [];
  assetSubTypes = [];
  isAssignNodeName = false;
  kit: any;
  phase = '';
  selectedAssets = [];
  showAssignNodeName = false;
  taskButtons = [];

  constructor(private router: Router, private route: ActivatedRoute, private executionService: ExecutionService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.assets = data['kit'].assets;
        this.kit = data['kit'];
      }
    );
    this.grabAssetSubTypes();
    this.route.params.subscribe(
      (params: Params) => {
        this.phase = params['phase'];
      }
    );
    this.needNodeName();
  }

  needNodeName(){
    console.log(this.kit);
    if(this.phase === 'Configuration'){
      if(this.kit.nodeRef.nodeNames.length === 0){
        this.showAssignNodeName = true;
      }
      for(let asset of this.kit.assets){

          if(!asset.nodeName){
            console.log('An Asset Does Not Have a NodeName!');
            this.showAssignNodeName = true;
          }

      }
    }
    
  }

  onAssignNodeName(){
    this.isAssignNodeName = true;
  }

  ngAfterViewChecked(){
    //this.isAssignNodeName = false;
    console.log('*****TRIGGERED*****');
  }

  displayTask(asset:any){
    for(let phase of asset.log.build){
      if(phase.phaseName === this.phase){
        for(let task of phase.tasks){
          if(!task.endDate){
            return task.taskName;
          }
        }
        return this.phase + ' Complete';
      }
    }
  }

  taskAction(index:any,task:string, action:string){
    for(let phase of this.selectedAssets[index].log.build){
      if(phase.phaseName === this.phase){
        for(let phaseTask of phase.tasks){
          if(phaseTask.taskName === task){
            if(action === 'Start'){
              if(task==='Capture Serial Number'){
                this.router.navigate([this.selectedAssets[index]._id], { relativeTo: this.route });
              }
              if(task==='Assign ALIS Node Name'){
                this.router.navigate([this.selectedAssets[index]._id], { relativeTo: this.route });
              }
              phaseTask.startDate = Date.now();
            }
            if(action === 'Complete'){
              if(task === 'Capture Serial Number'){
                this.router.navigate([this.selectedAssets[index]._id], { relativeTo: this.route });
              }
              if(task==='Assign ALIS Node Name'){
                this.router.navigate([this.selectedAssets[index]._id], { relativeTo: this.route });
              }
              else{
                phaseTask.endDate = Date.now();
              }
            }
          }
        }
      }
    }
    this.executionService.updateAsset(this.selectedAssets[index]._id,this.selectedAssets[index])
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  getTaskStatus(index:any,task:string){
    for(let phase of this.selectedAssets[index].log.build){
      if(phase.phaseName === this.phase){
        for(let phaseTask of phase.tasks){
          if(phaseTask.taskName === task){
            if(!phaseTask.startDate){
              return 'Start'
            }
            if(phaseTask.startDate && !phaseTask.endDate){
              return 'Complete'
            } else {
              return 'Completed: ' + (this.executionService.dateToString(phaseTask.endDate).getMonth()+1) + '/' + this.executionService.dateToString(phaseTask.endDate).getDate();
            }
          }
        }
      }
    }
  }

  grabAssetSubTypes(){
    for(let asset of this.assets){
      if(!this.assetSubTypes.includes(asset.assetSubType)){
        this.assetSubTypes.push(asset.assetSubType);
      }
    }
    console.log(this.assetSubTypes);
  }

  selectAssets(type:string){
    this.selectedAssets = [];
    this.taskButtons = [];
    for(let asset of this.assets){
      if(asset.assetSubType === type){
        this.selectedAssets.push(asset);
      }
    }
    for(let phase of this.selectedAssets[0].log.build){
      if(phase.phaseName === this.phase){
        for(let task of phase.tasks){
          this.taskButtons.push(task.taskName);
        }
      }
    }
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route })
  }

  onAssetSelect(index: number){
    console.log(this.executionService.getAssetId(index));
    this.router.navigate([this.executionService.getAssetId(index)], { relativeTo: this.route });
  }

}
