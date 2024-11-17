import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Documentation } from '../../services/DocumentationService/documentation.service';

@Component({
  selector: 'app-create-document-dialog',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,FormsModule],
  templateUrl: './create-document-dialog.component.html',
  styleUrl: './create-document-dialog.component.css'
})
export class CreateDocumentDialogComponent {
  createDocumentForm : Documentation ;
  /*
  document = {
    title: '',
    dev: '',
    date: new Date(),
    status: 'À faire',
    client: '',
  };
*/
  statusOptions = ['En cours', 'Terminé', 'En attente de Chiffrage', 'Annulé', 'À faire'];

  constructor(private dialogRef: MatDialogRef<CreateDocumentDialogComponent>) {
    this.createDocumentForm = {
      _id: '',  // ID du document
      title: '', // Titre du document
      dev: '',   // Développeur
      date: new Date(),    // Date de création
      client: '', // Contexte
      status: 'À faire', // Statut
      modifications: [''],  // Liste des modifications
      bobTable: [], // Contenu du BOB
      commentaire: '', // Zone de commentaires (optionnelle)
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.dialogRef.close(this.createDocumentForm);
  }
}
