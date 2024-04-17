import { Component, OnInit } from '@angular/core';
import { CursoService } from '../services/courses.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cursos: any[] = []; // Inicialización en el lugar
  profesores: any[] = [];

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.obtenerCursos();
    // Si necesitas listar también los profesores, descomenta la siguiente línea
    this.obtenerProfesores();
  }

  obtenerCursos(): void {
    this.cursoService.obtenerCursos().subscribe(
      data => {
        this.cursos = data;
      },
      error => {
        console.error('Error al obtener cursos:', error);
      }
    );
  }

  // Si necesitas obtener los profesores, puedes agregar este método
  obtenerProfesores(): void {
    this.cursoService.obtenerProfesores().subscribe(
      data => {
        this.profesores = data;
      },
      error => {
        console.error('Error al obtener profesores:', error);
      }
    );
  }
}