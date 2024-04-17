import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/users';
import { DataLoginService } from 'src/app/services/data-login.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  usuario: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  submitForm() {
    const data = {
      usuario: this.usuario,
      password: this.password
    };
  
    this.http.post<any>('http://localhost:4000/api/usuarios/auth', data)
      .subscribe(
        response => {
          if (response.mensaje === 'OK') {
            // Redirigir al componente correspondiente
            if (response.rol === 1) {
              // Redirigir al componente del alumno y pasar la información del usuario
              this.router.navigate(['/coursesStudent'], { state: { usuario: response.usuario } });
            } else if (response.rol === 2) {
              // Redirigir al componente del profesor y pasar la información del usuario
              this.router.navigate(['/coursesStudent'], { state: { usuario: response.usuario } });
            }
          } else {
            this.mensaje = 'Credenciales incorrectas';
          }
        },
        error => {
          console.error('Error al enviar los datos:', error);
          this.mensaje = 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
        }
      );
  }
  
}
