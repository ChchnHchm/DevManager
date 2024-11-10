import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Documentation {
  id: number;
  titre: string;
  contexte: string;
  developpeur: string;
  modifications: string[];
  bobTable: { ecran: string, type: string, nouveau: boolean }[];
}

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
  private docs: Documentation[] = [
    {
      id: 1,
      titre: 'Documentation 1',
      contexte: 'Contexte de la doc',
      developpeur: 'Jean Dupont',
      modifications: ['Modif 1', 'Modif 2'],
      bobTable: [
        { ecran: 'Accueil', type: 'Mise à jour', nouveau: true },
        { ecran: 'Profil', type: 'Nouveau', nouveau: false }
      ]
    }
  ];

  getDocs(): Observable<Documentation[]> {
    return of(this.docs);
  }

  getDocById(id: number): Observable<Documentation | undefined> {
    return of(this.docs.find(doc => doc.id === id));
  }
}
