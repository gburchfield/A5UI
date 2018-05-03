import { ExecutionService } from '../../production/execution/execution.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-execution',
  templateUrl: './process-execution.component.html',
  styleUrls: ['./process-execution.component.css']
})
export class ProcessExecutionComponent implements OnInit {
  process = [];
  constructor(private executionService: ExecutionService) { }

  ngOnInit() {
    this.process = this.executionService.getExecutionProcess();
  }

}
