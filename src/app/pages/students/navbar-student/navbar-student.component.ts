import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface UserData {
  nombre: string;
}

@Component({
  selector: 'app-navbar-student',
  templateUrl: './navbar-student.component.html',
  styleUrls: ['./navbar-student.component.css']
})
export class NavbarStudentComponent {
  usuario: string;

  constructor(private router: Router) {
    this.usuario = ''; // Inicialización aquí
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const userData = navigation.extras.state as UserData;
      this.usuario = userData.nombre;
    }
  }
}
