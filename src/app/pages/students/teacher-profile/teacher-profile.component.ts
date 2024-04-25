import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../services/courses.service';
import { CalendarEvent } from 'angular-calendar';

interface Horario {
  titulo: string;
  dia_semana: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  hora_inicio: string;
  hora_fin: string;
  fecha: string;
  duracion: number;
}
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  profesor: any;
  eventos: CalendarEvent[] = [];
  viewDate: Date = new Date(); 


  constructor(private route: ActivatedRoute, private cursoService: CursoService) { }

  ngOnInit(): void {
    this.obtenerProfesor();
  }
  obtenerProfesor(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.cursoService.obtenerProfesorPorId(id).subscribe(
        (data) => {
          this.profesor = data;
          this.cargarEventosCalendario();
        },
        (error) => {
          console.error('Error al obtener el profesor:', error);
        }
      );
    }
  }
  cargarEventosCalendario(): void {
    if (this.profesor && this.profesor.horarios) {
      this.eventos = this.profesor.horarios.map((horario: Horario) => ({
        start: new Date(`${horario.fecha}T${horario.hora_inicio}`),
        end: new Date(`${horario.fecha}T${horario.hora_fin}`),
        title: `${horario.titulo} (${horario.hora_inicio} - ${horario.hora_fin})`,
        allDay: false
      }));
    }
  }

}