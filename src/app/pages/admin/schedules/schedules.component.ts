import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  horarios: any[] = [];
  selectedHorario: any | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getHorarios();
  }

  getHorarios(): void {
    this.adminService.obtenerHorarios().subscribe(
      (response) => {
        this.horarios = response;
      },
      (error) => {
        console.error('Error al obtener los horarios:', error);
      }
    );
  }

  selectHorario(horario: any): void {
    this.selectedHorario = horario;
  }

  deselectHorario(): void {
    this.selectedHorario = null;
  }
}
