import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../node.model';
import { EnterpriseService } from '../../../../enterprise.service';
@Component({
  selector: 'app-node-item',
  templateUrl: './node-item.component.html',
  styleUrls: ['./node-item.component.css']
})
export class NodeItemComponent implements OnInit {
  @Input() nodeIndex: number;
  @Input() node: Node;
  constructor(private enterpriseService: EnterpriseService) { }

  ngOnInit() {
  }
  onClick(){
    this.enterpriseService.nodeSelected.emit(this.node);
  }
}
