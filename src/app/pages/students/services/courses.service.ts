import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrlProfesores = 'http://localhost:4000/api/profesores'; 
  private apiUrlInscripciones = 'http://localhost:4000/api/inscripciones'; // Nueva URL para filtrar por inscripciones

  constructor(private http: HttpClient) { }

  // Método para obtener todos los profesores
  obtenerProfesores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProfesores);
  }

  // Método para obtener un profesor por su ID
  obtenerProfesorPorId(id: string): Observable<any> {
    const url = `${this.apiUrlProfesores}/filtrar/${id}`;
    return this.http.get<any>(url);
  }

  // Método para obtener profesores por ID de usuario (filtrando por inscripciones)
  obtenerProfesoresPorUsuarioId(usuarioId: string): Observable<any[]> {
    const url = `${this.apiUrlInscripciones}/profesor/${usuarioId}`;
    return this.http.get<any[]>(url);
  }
}



// private apiUrlCursos = 'http://localhost:4000/api/cursos'; 
// obtenerCursos(): Observable<any[]> {
//   return this.http.get<any[]>(this.apiUrlCursos);
// }
