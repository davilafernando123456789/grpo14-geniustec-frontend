
import { AdminService } from '../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { Subject } from 'rxjs';

// Otros imports...
@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  dtElement: DataTableDirective | null = null;
  @ViewChild(DataTableDirective, { static: false })
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  profesores: any[] = [];
  editingProfesor: any | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    };
    this.getProfesores();
  }

  getProfesores(): void {
    this.adminService.obtenerProfesores().subscribe(
      (response) => {
        this.profesores = response;
        this.dtTrigger.next(null); // Recargar DataTables después de obtener los profesores
      },
      (error) => {
        console.error('Error al obtener los profesores:', error);
      }
    );
  }

  editProfesor(profesor: any): void {
    this.editingProfesor = { ...profesor };
  }

  guardarEdicion(): void {
    // Lógica para guardar la edición
    if (this.editingProfesor) {
      this.adminService.guardarProfesorEditado(this.editingProfesor).subscribe(
        () => {
          this.getProfesores();
          this.editingProfesor = null;
          alert('El profesor ha sido actualizado exitosamente.');
        },
        (error) => {
          console.error('Error al guardar la edición del profesor:', error);
          alert('Error al actualizar profesor.');
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.editingProfesor = null;
  }

  eliminarProfesor(id: number): void {
    this.adminService.eliminarProfesor(id.toString()).subscribe(
      () => {
        this.profesores = this.profesores.filter((profesor) => profesor.id !== id);
        this.dtTrigger.next(null); // Recargar DataTables después de eliminar un profesor
        alert('El profesor ha sido eliminado exitosamente.');
      },
      (error) => {
        console.error('Error al eliminar el profesor:', error);
        alert('Error al eliminar el profesor');
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}