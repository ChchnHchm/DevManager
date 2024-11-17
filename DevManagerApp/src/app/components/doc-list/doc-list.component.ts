import { Component,OnInit } from '@angular/core';
import { DocumentationService, Documentation } from '../../services/DocumentationService/documentation.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; 
import { MatIconModule } from '@angular/material/icon';
import { HeaderListComponent } from '../header-list/header-list.component';

@Component({
  selector: 'app-doc-list',
  standalone: true,
  imports: [CommonModule,RouterLink,HttpClientModule,FormsModule,MatIconModule,HeaderListComponent],
  templateUrl: './doc-list.component.html',
  styleUrl: './doc-list.component.css'
})
export class DocListComponent implements OnInit {
  currentPage: number = 1; // Page actuelle
  pageSize: number = 15;  // Nombre de résultats par page
  totalDocs: number = 0;  // Nombre total de documents
  docs: Documentation[] = [];  // Tableau pour stocker les documents
  isLoading = true;  // Indicateur de chargement
  sortColumn: string = 'date';  // Colonne de tri par défaut
  sortOrder: string = 'desc';  // Ordre de tri par défaut
  sortBy: string = 'date';
  statusOptions = ['En cours', 'Terminé', 'En attente de Chiffrage', 'Annulé', 'À faire'];
  filter = {
    status: '',
    dev: '',
    date: '',
    title: ''
  };

  constructor(private DocumentationService: DocumentationService,private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchDocs();
  }

  fetchDocs(): void {
    this.isLoading = true;

    this.DocumentationService.getDocList(this.sortColumn, this.sortOrder, this.filter, this.currentPage, this.pageSize)
    .subscribe(
      (data: { docs: Partial<Documentation>[]; total: number }) => {
        //this.docs = data.docs;  // Documents de la page courante
        this.docs = data.docs.map(doc => {
          // Vous pouvez ajouter des valeurs par défaut si des propriétés sont manquantes
          return {
            _id: doc._id || '',  // Valeur par défaut si _id est manquant
            title: doc.title || '',
            dev: doc.dev || '',
            status: doc.status || 'à faire', // Valeur par défaut si status est manquant
            client: doc.client || '',
            date: doc.date || new Date(),  // Valeur par défaut pour la date
            commentaire: doc.commentaire || '',
            modifications: doc.modifications || [],
            bobTable: doc.bobTable || []
          };
        });

        this.totalDocs = data.total;  // Total des documents disponibles
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des documents', error);
        this.isLoading = false;
      }
    );
  }

  // Fonction pour gérer les clics sur les en-têtes de colonne
  sortData(column: string): void {

    this.sortBy = column;
    this.sortColumn = column;
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {

      this.sortColumn = column;
      this.sortOrder = 'asc';
    }

    this.fetchDocs();
  }
  openDocument(doc: Documentation): void {
    this.router.navigate(['/docs', doc._id]);
  }

  applyFilters(filters: any): void {
    this.filter = filters;
    this.fetchDocs();
  }

  // Confirmer la suppression d'un document
  confirmDelete(doc: Documentation, event: MouseEvent): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: doc.title,
        date: new Date(doc.date).toLocaleDateString(),
        dev: doc.dev
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDocument(doc._id);
      }
    });
  }

  async deleteDocument(docId: string): Promise<void> {
    await this.DocumentationService.deleteDoc(docId).subscribe(
      (response:any) => {
        //console.log('Delete Response:', response);
      },
      (error:any) => {
        console.error('Delete Error:', error);
      }
    );
    this.fetchDocs();
  }

  onDocumentCreated(): void {
    this.fetchDocs();
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalDocs / this.pageSize)) {
      this.currentPage++;
      this.fetchDocs();
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchDocs();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalDocs / this.pageSize);
  }
  

}
