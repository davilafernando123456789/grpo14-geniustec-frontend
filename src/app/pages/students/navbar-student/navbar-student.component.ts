import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface UserData {
  usuario: string;
  nombre: string; // Agrega el campo nombre
}

@Component({
  selector: 'app-navbar-student',
  templateUrl: './navbar-student.component.html',
  styleUrls: ['./navbar-student.component.css']
})
export class NavbarStudentComponent implements OnInit {
  usuarioLogueado: UserData | null = null; // Cambiado a tipo UserData

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getUserData();
      }
    });
  }

  ngOnInit() {
    // No es necesario hacer nada aquí
  }

  // En cada componente que necesite acceder a los datos de sesión, como NavbarComponent
getUserData() {
  const usuarioString = sessionStorage.getItem('usuario');
  if (usuarioString) {
    this.usuarioLogueado = JSON.parse(usuarioString);
  }
}

}
