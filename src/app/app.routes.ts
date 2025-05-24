import { Routes } from '@angular/router'; 
import { LoginComponent } from './pages/autenticacao/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TipoServicoListComponent } from './pages/tipo-servico/list/tipo-servico-list.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { PaginaSobrancelhasComponent } from './pages/pagina-sobrancelhas/pagina-sobrancelhas.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { EditarCategoriaComponent } from './pages/editar-categoria/editar-categoria.component';
import { CadastroCategoriaComponent } from './pages/cadastro-categoria/cadastro-categoria.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tipo-servico/listar', component: TipoServicoListComponent }, //, canActivate: [AuthGuard] 
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: SobreComponent }, //, canActivate: [AuthGuard]
  { path: 'servicos', component: PaginaSobrancelhasComponent },
  { path: 'cadastro', component: CadastrarComponent }, //, canActivate: [AuthGuard]
  { path: 'cadastro-categoria', component: CadastroCategoriaComponent},
  { path: 'editar-categoria', component: EditarCategoriaComponent},
  { path: '**', redirectTo: "/home" } // Mova esta rota para o final
];
