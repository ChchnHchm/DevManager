import { Component,EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateDocumentDialogComponent } from '../create-document-dialog/create-document-dialog.component';
import { DocumentationService, Documentation } from '../../services/DocumentationService/documentation.service';

@Component({
  selector: 'app-header-list',
  standalone: true,
  imports: [FormsModule,CommonModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatIconModule,MatDatepickerModule,MatNativeDateModule,MatDialogModule],
  templateUrl: './header-list.component.html',
  styleUrl: './header-list.component.css'
})
export class HeaderListComponent {

  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();
  @Output() documentCreated = new EventEmitter<void>();

  filter = {
    status: '',
    dev: '',
    title: '',
    date: ''
  };

  statusOptions = ['En cours', 'Terminé', 'En attente de Chiffrage', 'Annulé', 'À faire'];

  constructor(private dialog: MatDialog,
    private documentationService: DocumentationService
  ) { }

  applyFilters(): void {
    this.filtersChanged.emit(this.filter);  // Émet les filtres vers le parent
  }
  
  openCreateDocumentDialog(): void {
    const dialogRef = this.dialog.open(CreateDocumentDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = result;
        this.documentationService.createDoc(formData).subscribe(
          (response:any) => {
            console.log('Document créé avec succès :', response);
          },
          (error:any) => {
            console.error('Erreur lors de la création du document :', error);
          }
        );

        this.documentCreated.emit();
      }
    });
  }
}
