import { ContractsService } from '../../contracts.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Status } from './status.model';

@Component({
  selector: 'app-kits-detail',
  templateUrl: './kits-detail.component.html',
  styleUrls: ['./kits-detail.component.css']
})
export class KitsDetailComponent implements OnInit {
  contract: string;
  kit: any;
  statusKit: any;
  kitProgress = "70%";
  viewStatus = false;
  assetsBuffer = [];
  headerBuffer = [];
  assetTypes = [];
  assetTypesStatusArray = [];
  statusBuffer = [];
  testStatusBuffer = {};

  constructor(private route: ActivatedRoute, private contractsService: ContractsService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params)=>{
        console.log(params["id"]);
      }
    );
    this.route.data.subscribe(
      (data: Data) => {
        this.kit = data['kit'];
      }
    );
    console.log(this.kit);
    this.contract = this.contractsService.getSelectedContract();
  }

  onViewStatus(){
    this.contractsService.getKit(this.kit._id);
    this.headerBuffer = [];
    this.assetsBuffer = [];
    this.assetTypesStatusArray=[];
    this.statusBuffer = [];
    this.statusKit = this.contractsService.getSelectedKit();
    console.log(this.statusKit);
    this.buildStatusHeaderAndTemplate();
    this.buildAssetTypeStatusArray();
    this.populateStatusTemplate();
    this.viewStatus=true;
  }

  populateStatusTemplate(){
    let phaseProgressArray = []
    for(let assetType of this.assetTypesStatusArray){
      for(let phase in assetType){
        for(let statusPhase of this.statusBuffer){
          if(statusPhase.phase.title === phase){
            for(let task in assetType[phase]){
              if(!phaseProgressArray[phase]){
                phaseProgressArray[phase] = [];
                phaseProgressArray[phase] = phaseProgressArray[phase].concat(assetType[phase][task]);
              } else{
                phaseProgressArray[phase] = phaseProgressArray[phase].concat(assetType[phase][task]);
              }
              if(statusPhase.firstTask.title === task){
                statusPhase.firstTask.status.push(this.getDateArray(assetType[phase][task]));
              }
              for(let otherTask of statusPhase.restOfTasks){
                if(otherTask.title === task){
                  otherTask.status.push(this.getDateArray(assetType[phase][task]));
                }
              }
            }
          }
        }
      }
    }
    this.getPhaseProgress(phaseProgressArray);
  }

  getDateArray(taskDatesArray:any){
    let earliestStartDate: Date = null;
    let latestEndDate: Date = null;
    let nullEndDateFlag = false;
    let estimatedStartDate: Date = this.contractsService.dateToString('2017-11-01T00:00:00.000Z');
    for(let dates of taskDatesArray){
      if(dates.startDate){
        if(earliestStartDate === null){
          earliestStartDate = this.contractsService.dateToString(dates.startDate);
        } else {
          if(earliestStartDate.getTime() > this.contractsService.dateToString(dates.startDate).getTime()){
            earliestStartDate = this.contractsService.dateToString(dates.startDate);
          }
        } 
      }
      if(dates.endDate){
        if(latestEndDate === null){
          latestEndDate = this.contractsService.dateToString(dates.endDate);
        } else {
          if(latestEndDate.getTime() < this.contractsService.dateToString(dates.endDate).getTime()){
            latestEndDate = this.contractsService.dateToString(dates.endDate);
          }
        }
      }
      if(!dates.endDate){
        nullEndDateFlag = true;
      }
    }
    if(nullEndDateFlag){
      latestEndDate = null;
    }
    return [earliestStartDate,latestEndDate,estimatedStartDate]
  }

  getPhaseProgress(phaseProgressArray: any){
    let totalFinished = 0
    let totalTasks = 0
    for(let phase in phaseProgressArray){
      let state = 'Not Started';
      let finished = 0;
      let percentage = '';
      for(let task of phaseProgressArray[phase]){
        totalTasks +=1;
        if(task.startDate != null){
          state = 'In Progress';
        }
        if(task.endDate){
          finished += 1;
          totalFinished +=1;
        }
      }
      percentage = Math.floor((finished/phaseProgressArray[phase].length)*100).toString() + '%';
      for(let statusPhase of this.statusBuffer){
        if(statusPhase.phase.title === phase){
          statusPhase.phase.progress = percentage;
        }
      }
    }
    this.kitProgress = Math.floor((totalFinished/totalTasks)*100).toString() + '%';
  }

  buildAssetTypeStatusArray(){
    let assetTypeStatus = [];
    for(let assetType in this.assetsBuffer){
      assetTypeStatus = [];
      for(let asset of this.assetsBuffer[assetType]){
        for(let phase of asset.log.build){
          if(!assetTypeStatus[phase.phaseName]){
            assetTypeStatus[phase.phaseName] = [];
            for(let task of phase.tasks){
              if(!assetTypeStatus[phase.phaseName][task.taskName]){
                assetTypeStatus[phase.phaseName][task.taskName] = [];
                assetTypeStatus[phase.phaseName][task.taskName].push(task);
              } else {
                assetTypeStatus[phase.phaseName][task.taskName].push(task);
              }
            }
          } else {
            for(let task of phase.tasks){
              if(!assetTypeStatus[phase.phaseName][task.taskName]){
                assetTypeStatus[phase.phaseName][task.taskName] = [];
                assetTypeStatus[phase.phaseName][task.taskName].push(task);
              } else {
                assetTypeStatus[phase.phaseName][task.taskName].push(task);
              }
            }
          }
        }
      }
      this.assetTypesStatusArray.push(assetTypeStatus);
    }
    console.log(this.assetTypesStatusArray)
  }

  buildStatusHeaderAndTemplate(){
    let firstIteration = true;
    for(let asset of this.statusKit.assets){
      if(firstIteration){
        for(let phase of asset.log.build){
          let phaseBuffer = {};
          phaseBuffer['phase'] = {rowSpan:phase.tasks.length ,title:phase.phaseName,progress:''};
          phaseBuffer['firstTask'] = {title:phase.tasks[0].taskName,status:[]};
          let firstTaskFlag = true;
          for(let task of phase.tasks){
            if(firstTaskFlag){
              firstTaskFlag = false;
              phaseBuffer['restOfTasks'] = [];
            } else if (!firstTaskFlag){
              phaseBuffer['restOfTasks'].push({title:task.taskName,status:[]})
            }
          }
          this.statusBuffer.push(phaseBuffer);
        }
        firstIteration = false;
      }
      if(!this.assetsBuffer[asset.assetSubType]){
        this.assetsBuffer[asset.assetSubType] = [];
        this.assetsBuffer[asset.assetSubType].push(asset);
      } else {
        this.assetsBuffer[asset.assetSubType].push(asset);
      }
    }
    for(let type in this.assetsBuffer){
      let typeBuffer = {name: type, count:this.assetsBuffer[type].length}
      this.headerBuffer.push(typeBuffer);
    }
    console.log(this.statusBuffer, this.assetsBuffer);
  }


  getKitStatusColor(input){
    if(input === "Not Started"){
      return "red"
    }
    if(input === "In Progress"){
      return "green"
    }
    if(input === "Delivered"){
      return "blue"
    }
    else{
      return "yellow"
    }
  }

  getTaskStatusDate(input){
    if(input[0]===null && input[1]===null){
      return input[2]
    }
    if(input[1]===null){
      return input[0]
    }
    else{
      return input[1]
    }
  }

  getTaskStatusColor(input){
    if(input[0]===null && input[1]===null){
      return 'grey'
    }
    if(input[1]===null){
      return 'green'
    }
    else{
      return 'blue'
    }
  }

  dateToString = this.contractsService.dateToString;

  onBuildKit(action:string){
    let updateKitBuffer
    if(action ==='start'){
      updateKitBuffer = {status:'In Progress',log:{startDate: Date.now()}}
      this.kit.status = 'In Progress';
      this.kit.log.startDate = Date.now();
    }
    if(action ==='stop'){
      updateKitBuffer = {status:'Not Started'}
      this.kit.status = 'Not Started';
    }

    this.contractsService.updateKit(this.kit._id, updateKitBuffer, null).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  onDeleteKit() {
    this.contractsService.deleteKit(this.kit._id, this.kit).subscribe(

    );
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

}

