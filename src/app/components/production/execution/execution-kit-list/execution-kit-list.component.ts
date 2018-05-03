import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExecutionService } from '../execution.service';

@Component({
  selector: 'app-execution-kit-list',
  templateUrl: './execution-kit-list.component.html',
  styleUrls: ['./execution-kit-list.component.css']
})
export class ExecutionKitListComponent implements OnInit {
  kits = [];
  phase = '';
  constructor(private executionService: ExecutionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.phase = params['phase'];
      }
    );
    this.route.data.subscribe(
      (data: Data) => {
        this.kits = data['kits'];
      }
    );
    console.log(this.phase);
    console.log(this.kits);
  }

  isStarted(phase:string, kit:any){
    let phaseTaskArray = [];
    let state = 'Not Started';
    let finished = 0;
    let percentage = '';
    for(let asset of kit.assets){
      for(let assetPhase of asset.log.build){
        if(assetPhase.phaseName === phase){
          phaseTaskArray = phaseTaskArray.concat(assetPhase.tasks);
        }
      }
    }
    for(let task of phaseTaskArray){
      if(task.startDate != null){
        state = 'In Progress';
      }
      if(task.endDate != null){
        finished += 1;
      }
    }
    percentage = Math.floor((finished/phaseTaskArray.length)*100).toString() + '%';
    return {status:state,progress:percentage}
  }


  onKitSelect(index:number){
    console.log(this.executionService.getKitId(index));
    this.router.navigate([this.executionService.getKitId(index).kitId, this.executionService.getKitId(index).nodeId], {relativeTo: this.route});
  }

}
