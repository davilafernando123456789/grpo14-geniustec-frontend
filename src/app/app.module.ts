import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/users/login/login.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { VerProductoComponent } from './pages/productos/ver-producto/ver-producto.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { StudentComponent } from './pages/users/register/student/student.component';
import { TeacherComponent } from './pages/users/register/teacher/teacher.component';
import { HomeComponent } from './pages/students/home/home.component';
// import { CoursesComponent } from './pages/students/courses/courses.component';
import { NavbarStudentComponent } from './pages/students/navbar-student/navbar-student.component';
import { CalendarStudentComponent } from './pages/students/calendar-student/calendar-student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
<<<<<<< Updated upstream
import { InicioComponent } from './pages/inicio/inicio.component';
import { PrecioComponent } from './pages/precio/precio.component';
import { BlogComponent } from './pages/blog/blog.component';
=======
import { ClassroomComponent } from './pages/meetings/classroom/classroom.component';
import { MessagesComponent } from './pages/students/messages/messages.component';
import { TeacherProfileComponent } from './pages/students/teacher-profile/teacher-profile.component';
import { ConversationComponent } from './pages/students/conversation/conversation.component';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    ListarProductosComponent,
    CrearProductosComponent,
    NavbarComponent,
    VerProductoComponent,
    EditarProductosComponent,
    StudentComponent,
    TeacherComponent,
    HomeComponent,
    // CoursesComponent,
    NavbarStudentComponent,
    CalendarStudentComponent,
    CalendarStudentComponent,
<<<<<<< Updated upstream
    InicioComponent,
    PrecioComponent,
    BlogComponent
=======
    ClassroomComponent,
    MessagesComponent,
    TeacherProfileComponent,
    ConversationComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule ,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
