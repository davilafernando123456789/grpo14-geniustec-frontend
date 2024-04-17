import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrlCursos = 'http://localhost:4000/api/cursos'; 
  private apiUrlProfesores = 'http://localhost:4000/api/profesores'; 

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlCursos);
  }

  // Si no necesitas este método, puedes eliminarlo
  obtenerProfesores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProfesores);
  }
}
