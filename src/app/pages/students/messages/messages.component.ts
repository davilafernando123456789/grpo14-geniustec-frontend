import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Buffer } from 'buffer';
import { ActivatedRoute } from '@angular/router';

interface Archivo {
  nombre: string;
  archivo: Buffer;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  socket: any;
  mensajes: any[] = [];
  nuevoMensaje: string = '';
  mediaRecorder: MediaRecorder | undefined;
  audioChunks: Blob[] = [];
  grabando: boolean = false;
  audioParaEnviar: Blob | null = null;
  archivoParaEnviar: Archivo | null = null;
  remite_id: number | null = null; // ID del alumno logueado
  destinatario_id: number | null = null; // ID del profesor seleccionado
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID del alumno logueado desde el almacenamiento de sesión
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.remite_id = usuario.id;
    } else {
      console.error('No se encontró información de usuario en la sesión.');
    }

    // Obtener el ID del profesor seleccionado desde la ruta
    this.route.params.subscribe((params) => {
      this.destinatario_id = params['profesorId'];
      console.log('ID del destinatario:', this.destinatario_id);
    });

    this.socket = io('http://localhost:4000');
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.cargarMensajesAnteriores();
    });

    this.socket.on('mensaje', (mensaje: any) => {
      // Verificar si el mensaje es para el destinatario actual
      if (mensaje.destinatario_id === this.destinatario_id) {
        // Filtrar solo los datos relevantes para mostrar en el mensaje
        const mensajeMostrar: any = {
          contenido: mensaje.contenido,
          remite_id: mensaje.remite_id,
        };

        // Verificar si hay un audio_url antes de agregarlo
        if (mensaje.audio_url !== null && mensaje.audio_url !== undefined) {
          mensajeMostrar.audio_url = mensaje.audio_url;
          console.log('Audio URL recibido:', mensaje.audio_url);
        }

        // Verificar si hay un archivo_url antes de agregarlo
        if (mensaje.archivo_url !== null && mensaje.archivo_url !== undefined) {
          mensajeMostrar.archivo_url = mensaje.archivo_url;
          console.log('Archivo URL recibido:', mensaje.archivo_url);
        }

        this.mensajes.push(mensajeMostrar);
      }
    });

    this.socket.on(
      'cargar-mensajes-anteriores',
      (mensajesAnteriores: any[]) => {
        console.log('Mensajes anteriores recibidos:', mensajesAnteriores);
        this.mensajes = mensajesAnteriores;
      }
    );

    // this.socket.on(
    //   'mensaje-voz',
    //   (data: { audioUrl: string; destinatario_id: number }) => {
    //     // Verificar si el mensaje de voz es para el destinatario actual
    //     if (data.destinatario_id === this.destinatario_id) {
    //       const audioElement = new Audio(data.audioUrl);
    //       audioElement.play();
    //     }
    //   }
    // );
    // this.socket.on(
    //   'archivo',
    //   (data: { archivoUrl: string; destinatario_id: number }) => {
    //     // Verificar si el mensaje de voz es para el destinatario actual
    //     if (data.destinatario_id === this.destinatario_id) {
    //       const audioElement = new Audio(data.archivoUrl);
    //       this.mensajes.push(mensaje.archivo_url);
    //     }

    //   }
    // );

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
    });
  }

  iniciarGrabacion(): void {
    this.grabando = true;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error al acceder al micrófono:', error);
        this.grabando = false;
      });
  }

  detenerGrabacion(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioParaEnviar = audioBlob;
        this.audioChunks = [];
        this.grabando = false;
      };
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const buffer = Buffer.from(arrayBuffer);
      this.archivoParaEnviar = { nombre: file.name, archivo: buffer };
    };
    reader.readAsArrayBuffer(file);
  }

  enviarMensaje(): void {
    if (this.remite_id && this.destinatario_id) {
      const mensajeTexto = this.nuevoMensaje.trim();

      if (
        mensajeTexto !== '' ||
        this.audioParaEnviar ||
        this.archivoParaEnviar
      ) {
        const mensaje = {
          contenido: mensajeTexto,
          remite_id: this.remite_id,
          destinatario_id: this.destinatario_id,
          sent: false,
          audio_url: this.audioParaEnviar ? this.audioParaEnviar : null,
          archivo_url: this.archivoParaEnviar ? this.archivoParaEnviar : null,
        };

        this.socket.emit('mensaje', mensaje);
        this.nuevoMensaje = '';
        this.audioParaEnviar = null;
        this.archivoParaEnviar = null;

        // Limpiar el campo de archivo seleccionado
        const fileInput =
          document.querySelector<HTMLInputElement>('#fileInput');
        if (fileInput) {
          fileInput.value = ''; // Limpiar el valor del campo de archivo
        }
        this.cargarMensajesAnteriores();
      }
    } else {
      console.error('No se ha establecido el remitente o destinatario.');
    }
  }

  // enviarMensajeVoz(audioBlob: Blob): void {
  //   if (this.remite_id && this.destinatario_id) {
  //     this.socket.emit('mensaje-voz', {
  //       audioBlob,
  //       remite_id: this.remite_id,
  //       destinatario_id: this.destinatario_id,
  //     });
  //   } else {
  //     console.error('No se ha establecido el remitente o destinatario.');
  //   }
  // }
  cargarMensajesAnteriores(): void {
    if (this.destinatario_id && this.socket) {
      console.log(
        'Solicitando mensajes anteriores para el destinatario:',
        this.destinatario_id
      );
      this.socket.emit('cargar-mensajes-anteriores', this.destinatario_id);
    }
  }
}
// cargarMensajesAnteriores(): void {
//   this.socket.emit('cargar-mensajes-anteriores');
// }

// import { Component, OnInit } from '@angular/core';
// import { io } from 'socket.io-client';
// import { Buffer } from 'buffer';

// interface Archivo {
//   nombre: string;
//   archivo: Buffer;
// }

// @Component({
//   selector: 'app-messages',
//   templateUrl: './messages.component.html',
//   styleUrls: ['./messages.component.css'],
// })
// export class MessagesComponent implements OnInit {
//   socket: any;
//   mensajes: any[] = [];
//   nuevoMensaje: string = '';
//   mediaRecorder: MediaRecorder | undefined;
//   audioChunks: Blob[] = [];
//   grabando: boolean = false;
//   audioParaEnviar: Blob | null = null;
//   archivoParaEnviar: Archivo | null = null;

//   constructor() {}

//   ngOnInit(): void {
//     this.socket = io('http://localhost:4000');

//     // this.socket.on('mensaje', (mensaje: any) => {
//     //   this.mensajes.push(mensaje);
//     // });
//     this.socket.on('mensaje', (mensaje: any) => {
//       // Filtrar solo los datos relevantes para mostrar en el mensaje
//       const mensajeMostrar: any = {
//         contenido: mensaje.contenido,
//         remite_id: mensaje.remite_id,
//       };

//       // Verificar si hay un audio_url antes de agregarlo
//       if (mensaje.audio_url !== null && mensaje.audio_url !== undefined) {
//         mensajeMostrar.audio_url = mensaje.audio_url;
//       }

//       // Verificar si hay un archivo_url antes de agregarlo
//       if (mensaje.archivo_url !== null && mensaje.archivo_url !== undefined) {
//         mensajeMostrar.archivo_url = mensaje.archivo_url;
//       }

//       this.mensajes.push(mensajeMostrar);
//     });

//     this.socket.on('mensajes-anteriores', (mensajesAnteriores: any[]) => {
//       this.mensajes = [...mensajesAnteriores];
//     });

//     this.socket.on('mensaje-voz', (audioUrl: string) => {
//       const audioElement = new Audio(audioUrl);
//       audioElement.play();
//     });

//     this.socket.on('archivo', (fileUrl: string) => {
//       const mensaje = {
//         archivo_url: fileUrl,
//         remite_id: 7, // ID del remitente
//       };
//       this.mensajes.push(mensaje);
//     });

//     this.socket.on('disconnect', () => {
//       console.log('Desconectado del servidor');
//     });
//   }

//   iniciarGrabacion(): void {
//     this.grabando = true;
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         this.mediaRecorder = new MediaRecorder(stream);
//         this.mediaRecorder.ondataavailable = (event) => {
//           this.audioChunks.push(event.data);
//         };
//         this.mediaRecorder.start();
//       })
//       .catch((error) => {
//         console.error('Error al acceder al micrófono:', error);
//         this.grabando = false;
//       });
//   }

//   detenerGrabacion(): void {
//     if (this.mediaRecorder) {
//       this.mediaRecorder.stop();
//       this.mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
//         this.audioParaEnviar = audioBlob;
//         this.audioChunks = [];
//         this.grabando = false;
//       };
//     }
//   }

//   onFileSelected(event: any): void {
//     const file: File = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       const arrayBuffer = reader.result as ArrayBuffer;
//       const buffer = Buffer.from(arrayBuffer);
//       this.archivoParaEnviar = { nombre: file.name, archivo: buffer };
//     };
//     reader.readAsArrayBuffer(file);
//   }

//   enviarMensaje(): void {
//     const remite_id = 7;
//     const destinatario_id = 3;
//     const mensajeTexto = this.nuevoMensaje.trim();

//     if (mensajeTexto !== '' || this.audioParaEnviar || this.archivoParaEnviar) {
//       const mensaje = {
//         contenido: mensajeTexto,
//         remite_id,
//         destinatario_id,
//         // tipo: 'texto',
//         audio_url: this.audioParaEnviar ? this.audioParaEnviar : null,
//         archivo_url: this.archivoParaEnviar ? this.archivoParaEnviar : null,
//       };

//       this.socket.emit('mensaje', mensaje);

//       this.nuevoMensaje = '';
//       this.audioParaEnviar = null;
//       this.archivoParaEnviar = null;
//     }
//   }

//   enviarMensajeVoz(audioBlob: Blob): void {
//     const remite_id = 7;
//     const destinatario_id = 3;
//     this.socket.emit('mensaje-voz', { audioBlob, remite_id, destinatario_id });
//   }

//   cargarMensajesAnteriores(): void {
//     this.socket.emit('cargar-mensajes-anteriores');
//   }
// }
