import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-scholars',
  templateUrl: './scholars.component.html',
  styleUrls: ['./scholars.component.css']
})
export class ScholarsComponent implements OnInit {
  alumnos: any[] = [];
  selectedAlumno: any | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos(): void {
    this.adminService.obtenerAlumnos().subscribe(
      (response) => {
        this.alumnos = response;
      },
      (error) => {
        console.error('Error al obtener los alumnos:', error);
      }
    );
  }

  selectAlumno(alumno: any): void {
    this.selectedAlumno = alumno;
  }

  deselectAlumno(): void {
    this.selectedAlumno = null;
  }
}
