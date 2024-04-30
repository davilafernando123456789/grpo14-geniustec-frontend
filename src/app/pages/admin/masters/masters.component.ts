import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  profesores: any[] = [];
  editingProfesor: any | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores(): void {
    this.adminService.obtenerProfesores().subscribe(
      (response) => {
        this.profesores = response;
      },
      (error) => {
        console.error('Error al obtener los profesores:', error);
      }
    );
  }

  editProfesor(profesor: any): void {
    this.editingProfesor = { ...profesor }; // Clonar el profesor para evitar cambios directos
  }

  guardarEdicion(): void {
    // Lógica para guardar la edición
    if (this.editingProfesor) {
      this.adminService.guardarProfesorEditado(this.editingProfesor).subscribe(
        () => {
          // Actualizar la lista de profesores después de guardar la edición
          this.getProfesores();
          this.editingProfesor = null; // Limpiar el profesor en edición
        },
        (error) => {
          console.error('Error al guardar la edición del profesor:', error);
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.editingProfesor = null; // Limpiar el profesor en edición
  }

  eliminarProfesor(id: number): void {
    // Lógica para eliminar el profesor
    this.adminService.eliminarProfesor(id.toString()).subscribe(
      () => {
        // Actualizar la lista de profesores después de la eliminación
        this.profesores = this.profesores.filter((profesor) => profesor.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el profesor:', error);
      }
    );
  }
}