import { Component,OnInit } from '@angular/core';
import { DocumentationService, Documentation } from '../../services/documentation.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doc-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './doc-list.component.html',
  styleUrl: './doc-list.component.css'
})
export class DocListComponent {
  documents = [
    { id: 1, status: 'green', date: '2024-11-01', dev: 'John Doe', title: 'Document 1' },
    { id: 2, status: 'red', date: '2024-10-15', dev: 'Jane Smith', title: 'Document 2' },
    { id: 3, status: 'orange', date: '2024-11-05', dev: 'Alice Brown', title: 'Document 3' },
  ];

  constructor(private router: Router) {}
  
  openDocument(doc: any) {
    this.router.navigate(['/docs', doc.id]);
  }
}
