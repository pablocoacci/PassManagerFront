import { Component, Input, OnInit } from '@angular/core';
import { PasswordDetail } from '../../../shared/models/passwords-dal.model';

@Component({
  selector: 'app-password-detail-modal',
  templateUrl: './password-detail-modal.component.html',
  styleUrls: ['./password-detail-modal.component.css']
})
export class PasswordDetailModalComponent implements OnInit {

  @Input() modalId: PasswordDetail
  @Input() passwordItem: PasswordDetail

  constructor() { }

  ngOnInit(): void {
  }

}
