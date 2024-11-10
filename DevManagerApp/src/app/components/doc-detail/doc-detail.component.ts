import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentationService, Documentation } from '../../services/documentation.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table'; 


@Component({
  selector: 'app-doc-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
  ],
  templateUrl: './doc-detail.component.html',
  styleUrl: './doc-detail.component.css'
})
export class DocDetailComponent {
  doc: Documentation | undefined;

  constructor(
    private route: ActivatedRoute,
    private docService: DocumentationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.docService.getDocById(id).subscribe(doc => this.doc = doc);
  }
}
