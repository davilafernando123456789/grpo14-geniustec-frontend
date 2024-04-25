import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { LoginComponent } from './pages/users/login/login.component';
import { StudentComponent } from './pages/users/register/student/student.component';
import { TeacherComponent } from './pages/users/register/teacher/teacher.component';
import { NavbarStudentComponent } from './pages/students/navbar-student/navbar-student.component';
// import { CoursesComponent } from './pages/students/courses/courses.component';
import { HomeComponent } from './pages/students/home/home.component';
import { CalendarStudentComponent } from './pages/students/calendar-student/calendar-student.component';
<<<<<<< Updated upstream
import { InicioComponent } from './pages/inicio/inicio.component';
import { PrecioComponent } from './pages/precio/precio.component';
import { BlogComponent } from './pages/blog/blog.component';



const routesInicio: Routes = [
  { path: '', component: InicioComponent },
  { path: 'precio', component: PrecioComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crear-usuario', component: CreateUserComponent },
  { path: 'listar-productos', component: ListarProductosComponent },
  { path: 'crear-productos', component: CrearProductosComponent },
  { path: 'registerStudent', component: StudentComponent },
  { path: 'registerTeacher', component: TeacherComponent },
  { path: 'navbar', component: NavbarStudentComponent },
  { path: 'coursesStudent', component: CoursesComponent },
=======
import { ClassroomComponent } from './pages/meetings/classroom/classroom.component';
import { MessagesComponent } from './pages/students/messages/messages.component';
import { TeacherProfileComponent } from './pages/students/teacher-profile/teacher-profile.component';
import { ConversationComponent } from './pages/students/conversation/conversation.component';

const routesInicio: Routes = [
  { path: '', component: LoginComponent },
  { path: 'crear-usuario', component: CreateUserComponent, data: { message: 'Create User route' } },
  { path: 'listar-productos', component: ListarProductosComponent, data: { message: 'List Products route' } },
  { path: 'crear-productos', component: CrearProductosComponent, data: { message: 'Create Products route' } },
  { path: 'registerStudent', component: StudentComponent, data: { message: 'Register Student route' } },
  { path: 'registerTeacher', component: TeacherComponent, data: { message: 'Register Teacher route' } },
  { path: 'navbar', component: NavbarStudentComponent, data: { message: 'Navbar Student route' } },
  // { path: 'home', component: NavbarStudentComponent },
  // { path: 'coursesStudent', component: CoursesComponent, data: { message: 'Courses Student route' } },
>>>>>>> Stashed changes
  { path: 'home', component: HomeComponent },
  { path: 'meetings', component: ClassroomComponent, data: { message: 'meetings route' } },
  { path: 'conversation', component: ConversationComponent, data: { message: 'ConversationComponent route' } },
  { path: 'messages/:profesorId', component: MessagesComponent, data: { message: 'Messages route' } },
  { path: 'calendarStudent', component: CalendarStudentComponent, data: { message: 'Calendar Student route' } },
  { path: 'editar-producto/:id', component: EditarProductosComponent, data: { message: 'Edit Product route' } },
  { path: 'teacherProfile/:id', component: TeacherProfileComponent, data: { message: 'Edit Product route' } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routesInicio)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    routesInicio.forEach(route => {
      console.log(route.data?.['message']);

    });
  }
}