// node-popup.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentNode } from '../org-chart/org-char-data.service';

@Component({
  selector: 'app-node-popup',
  templateUrl: './node-popup.component.html',
  styleUrls: ['./node-popup.component.css'],
})
export class NodePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<NodePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nodeInfo: DepartmentNode }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}


