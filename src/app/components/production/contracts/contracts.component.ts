import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContractsService } from './contracts.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
  providers: []
})
export class ContractsComponent implements OnInit {
  contracts: any;
  constructor(private contractsService: ContractsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
