import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ClassroomMeetingResponse {
  sala: string;
}

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  sala: ClassroomMeetingResponse | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Suponiendo que tengas el ID del profesor almacenado en una variable llamada profesorId
    const profesorId = '24'; 

    this.obtenerSalaWebex(profesorId);
  }

  obtenerSalaWebex(profesorId: string) {
    this.http.get<ClassroomMeetingResponse>(`http://localhost:4000/api/profesores/filtrar/${profesorId}`)
      .subscribe(
        (response: ClassroomMeetingResponse) => {
          this.sala = response;
        },
        (error) => {
          console.error('Error al obtener la sala de reunión:', error);
        }
      );
  }

  ingresarReunion() {
    if (this.sala && this.sala.sala) {
      window.open(this.sala.sala, '_blank');
    } else {
      console.error('No se pudo abrir la reunión: URL no válida');
    }
  }
}
