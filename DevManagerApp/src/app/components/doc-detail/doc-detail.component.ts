import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentationService, Documentation } from '../../services/DocumentationService/documentation.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doc-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './doc-detail.component.html',
  styleUrl: './doc-detail.component.css'
})
export class DocDetailComponent implements OnInit {
  doc: Documentation | null = null;

  constructor(
    private route: ActivatedRoute,
    private documentationService: DocumentationService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du document depuis l'URL
    const id = this.route.snapshot.paramMap.get('id')!;
    // Appeler le service pour obtenir les détails du document
    this.documentationService.getDocById(id).subscribe(
      (data : any) => {
        this.doc = data; // Assigner les données reçues à la variable doc
      },
      (error : any) => {
        console.error('Erreur lors de la récupération du document', error);
      }
    );
  }
}
