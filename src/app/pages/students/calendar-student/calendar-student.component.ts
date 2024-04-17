import { Component, OnInit } from '@angular/core';
import { CalendarStudentService} from '../services/calendar-student.service';
@Component({
  selector: 'app-calendar-student',
  templateUrl: './calendar-student.component.html',
  styleUrls: ['./calendar-student.component.css']
})
export class CalendarStudentComponent implements OnInit {
  horarios: any[] = [];

  constructor(private calendarStudentService: CalendarStudentService) { }

  ngOnInit(): void {
    this.obtenerHorarios();
  }

  obtenerHorarios(): void {
    this.calendarStudentService.obtenerHorarios().subscribe(
      data => {
        this.horarios = data;
      },
      error => {
        console.error('Error al obtener horarios:', error);
      }
    );
  }
}