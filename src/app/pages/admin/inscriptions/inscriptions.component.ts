import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
declare var $: any;

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css'],
})
export class InscriptionsComponent implements OnInit {
  inscripciones: any[] = [];
  selectedInscripcion: any | null = null;
  editingInscripcion: any | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  key: string = '';
  searchTerm: string = '';
  reverse: boolean = false;

  constructor(private adminService: AdminService) {}

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
    // Clonar la inscripción seleccionada para editarla
    this.editingInscripcion = { ...inscripcion };
  }

  deselectInscripcion(): void {
    this.selectedInscripcion = null;
    this.editingInscripcion = null;
  }

  guardarEdicion(): void {
    // Lógica para guardar la edición
    if (this.editingInscripcion) {
      this.adminService
        .guardarInscripcionEditada(this.editingInscripcion)
        .subscribe(
          () => {
            // Actualizar la lista de inscripciones después de guardar la edición
            this.getInscripciones();
            this.editingInscripcion = null;
            alert('La inscripción ha sido actualizada exitosamente.');
          },
          (error) => {
            console.error(
              'Error al guardar la edición de la inscripción:',
              error
            );
            alert('Error al actualizar inscripción.');
          }
        );
    }
  }

  cancelarEdicion(): void {
    this.editingInscripcion = null; // Limpiar la inscripción en edición
  }

  eliminarInscripcion(id: number): void {
    // Lógica para eliminar la inscripción
    this.adminService.eliminarInscripcion(id.toString()).subscribe(
      () => {
        // Actualizar la lista de inscripciones después de la eliminación
        this.inscripciones = this.inscripciones.filter(
          (inscripcion) => inscripcion.id !== id
        );
        alert('La inscripción ha sido eliminada exitosamente.');
      },
      (error) => {
        console.error('Error al eliminar la inscripción:', error);
        alert('Error al eliminar la inscripción');
      }
    );
  }
  sort(key: string): void {
    this.key = key;
    this.reverse = !this.reverse;
  }
  search(): void {
    console.log('search');
    this.adminService.buscarProfesoresPorNombre(this.searchTerm).subscribe(
      (response) => {
        console.log('Response de búsqueda:', response);
        this.inscripciones = response;
      },
      (error) => {
        console.error('Error al buscar los profesores:', error);
      }
    );
  }

  onPageChange(pageNumber: number): void {
    console.log('Número de página:', pageNumber); 
    this.currentPage = pageNumber;
  }
  goToFirstPage(): void {
    this.currentPage = 1;
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.inscripciones.length / this.itemsPerPage);
  }

  // Devuelve los elementos correspondientes a la página actual
  get currentPageData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.inscripciones.slice(startIndex, endIndex);
  }
}
