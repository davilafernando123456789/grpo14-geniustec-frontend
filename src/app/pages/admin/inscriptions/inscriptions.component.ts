import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css']
})
export class InscriptionsComponent implements OnInit {
  inscripciones: any[] = [];
  selectedInscripcion: any | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getInscripciones();
  }

  getInscripciones(): void {
    this.adminService.obtenerInscripciones().subscribe(
      (response) => {
        this.inscripciones = response;
      },
      (error) => {
        console.error('Error al obtener las inscripciones:', error);
      }
    );
  }

  selectInscripcion(inscripcion: any): void {
    this.selectedInscripcion = inscripcion;
  }

  deselectInscripcion(): void {
    this.selectedInscripcion = null;
  }
}
