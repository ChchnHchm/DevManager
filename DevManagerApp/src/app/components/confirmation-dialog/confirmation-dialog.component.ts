import { Component,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatIconModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, date: string, dev: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // Retourne false si annulé
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Retourne true si confirmé
  }
}
