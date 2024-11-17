import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams  } from '@angular/common/http';

export type StatusType = 'en cours' | 'terminé' | 'en attente de chiffrage' | 'annulé' | 'à faire';

export interface Documentation {
  _id: string;  // ID du document
  title: string; // Titre du document
  dev: string;   // Développeur
  date: Date;    // Date de création
  client: string; // Contexte
  status: string; // Statut
  modifications: string[];  // Liste des modifications
  bobTable: { ecran: string, type: string, nouveau: boolean }[]; // Contenu du BOB
  commentaire?: string; // Zone de commentaires (optionnelle)
}

@Injectable({
  providedIn: 'root'
})

export class DocumentationService {
  private apiUrl = '/api/docs';  // URL de l'API backend

  constructor(private http: HttpClient) {}

  getDocList(sortBy: string  = 'status', sortOrder: string = 'desc', filters: any,  page: number, pageSize: number): Observable<{ docs: Partial<Documentation>[]; total: number }> {
    let params = new HttpParams()
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

      if (filters.status) {
        params = params.append('status', filters.status);
      }
      if (filters.dev) {
        params = params.append('dev', filters.dev);
      }
      if (filters.date) {
        params = params.append('date', filters.date);
      }
      if (filters.title) {
        params = params.append('title', filters.title);
      }
      if (filters.sortBy) {
        params = params.append('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        params = params.append('sortOrder', filters.sortOrder);
      }
      params = params.append('page', page);
      params = params.append('pageSize', pageSize);


    return this.http.get<{ docs: Partial<Documentation>[]; total: number }>(this.apiUrl + "/list", { params });
                       
  }

  // Méthode pour récupérer tous les documents
  getDocs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Méthode pour récupérer un document spécifique par ID
  getDocById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDoc(docData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, docData);
  }

  // Méthode pour supprimer un document
  deleteDoc(docId: string): Observable<any> {
    //console.log(`Requesting DELETE for ID: ${docId} at URL: ${this.apiUrl}/${docId}`);
    return this.http.delete<any>(`${this.apiUrl}/${docId}`);
  }


}
