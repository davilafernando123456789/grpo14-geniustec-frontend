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
import { CoursesComponent } from './pages/students/courses/courses.component';
import { HomeComponent } from './pages/students/home/home.component';
import { CalendarStudentComponent } from './pages/students/calendar-student/calendar-student.component';
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
  { path: 'home', component: HomeComponent },
  { path: 'calendarStudent', component: CalendarStudentComponent },
  { path: 'editar-producto/:id', component: EditarProductosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forRoot(routesInicio)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
