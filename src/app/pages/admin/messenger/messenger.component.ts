import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  mensajes: any[] = [];
  selectedMensaje: any | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getMensajes();
  }

  getMensajes(): void {
    this.adminService.obtenerMensajes().subscribe(
      (response) => {
        this.mensajes = response;
      },
      (error) => {
        console.error('Error al obtener los mensajes:', error);
      }
    );
  }

  selectMensaje(mensaje: any): void {
    this.selectedMensaje = mensaje;
  }

  deselectMensaje(): void {
    this.selectedMensaje = null;
  }
}
