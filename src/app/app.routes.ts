import { Routes } from '@angular/router'; 
import { LoginComponent } from './pages/autenticacao/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TipoServicoListComponent } from './pages/tipo-servico/list/tipo-servico-list.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { CadastroCategoriaComponent } from './pages/cadastro-categoria/cadastro-categoria.component';
import { CategoriaAtualizarComponent } from './pages/atualizar-categoria/atualizar-categoria.component';
import { AdmAgendamentoComponent } from './pages/adm-agendamento/adm-agendamento.component';
import { AdmCategoriaComponent } from './pages/adm-categoria/adm-categoria.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { CadastroServicoComponent } from './pages/cadastro-servico/cadastro-servico.component';
import { ServicoAtualizarComponent } from './pages/atualizar-servico/atualizar-servico.component';
import { DeletarComponent } from './pages/deletar/deletar.component';
import { MeusAgendamentosComponent } from './pages/meus-agendamentos/meus-agendamentos.component';
import { AtualizarPerfilComponent } from './pages/atualizar-perfil/atualizar-perfil.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tipo-servico/listar', component: TipoServicoListComponent }, //, canActivate: [AuthGuard] 
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: SobreComponent }, //, canActivate: [AuthGuard]
  { path: 'servicos/:id', component: ServicosComponent },
  { path: 'cadastro', component: CadastrarComponent }, //, canActivate: [AuthGuard]
  { path: 'cadastro-categoria', component: CadastroCategoriaComponent},
  { path: 'categoria-atualizar', component: CategoriaAtualizarComponent},
  { path: 'cadastro-produto', component: CadastroServicoComponent},
  { path: 'atualizar-produto', component: ServicoAtualizarComponent},
  { path: 'adm-agendamento', component: AdmAgendamentoComponent},
  { path: 'adm-categoria', component: AdmCategoriaComponent},
  { path: 'agendamento', component: AgendamentoComponent},
  { path: 'redefinir-senha', component: RedefinirSenhaComponent},
  { path: 'perfil-usuario', component: PerfilUsuarioComponent},
  { path: 'deletar/:id', component: DeletarComponent},
  { path: 'meus-agendamentos', component: MeusAgendamentosComponent},
  { path: 'atualizar-perfil', component: AtualizarPerfilComponent},
  { path: '**', redirectTo: "/home" } // Mova esta rota para o final
];
