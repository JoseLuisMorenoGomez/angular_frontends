// node-popup.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-node-popup',
  templateUrl: './node-popup.component.html',
  styleUrls: ['./node-popup.component.css']
})
export class NodePopupComponent {
  // Recibe los datos del componente que abre el modal
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NodePopupComponent>
  ) {}

  // Método para cerrar la ventana modal
  closeDialog(): void {
    this.dialogRef.close();
  }
}

