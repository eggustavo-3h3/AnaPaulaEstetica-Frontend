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
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { CadastroServicoComponent } from './pages/cadastro-servico/cadastro-servico.component';
import { ServicoAtualizarComponent } from './pages/atualizar-servico/atualizar-servico.component';
import { DeletarComponent } from './pages/deletar/deletar.component';
import { MeusAgendamentosComponent } from './pages/meus-agendamentos/meus-agendamentos.component';
import { AtualizarPerfilComponent } from './pages/atualizar-perfil/atualizar-perfil.component';
import { EnviarEmailComponent } from './pages/enviar-email/enviar-email.component';
import { AtualizarSenhaComponent } from './pages/atualizar-senha/atualizar-senha.component';
import { ResetSenhaComponent } from './pages/reset-senha/reset-senha.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tipo-servico/listar', component: TipoServicoListComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'servicos/:id', component: ServicosComponent, canActivate: [AuthGuard]},
  { path: 'cadastro', component: CadastrarComponent },
  { path: 'enviar-email', component: EnviarEmailComponent },
  { path: 'cadastro-categoria', component: CadastroCategoriaComponent, canActivate: [AuthGuard]},
  { path: 'atualizar-categoria', component: CategoriaAtualizarComponent, canActivate: [AuthGuard]},
  { path: 'cadastro-produto', component: CadastroServicoComponent, canActivate: [AuthGuard]},
  { path: 'atualizar-produto', component: ServicoAtualizarComponent, canActivate: [AuthGuard]},
  { path: 'adm-agendamento', component: AdmAgendamentoComponent, canActivate: [AuthGuard]},
  { path: 'adm-categorias-serviços', component: AdmCategoriaComponent, canActivate: [AuthGuard]},
  { path: 'agendamento', component: AgendamentoComponent, canActivate: [AuthGuard]},
  { path: 'reset-senha/:chave-reset', component: ResetSenhaComponent},
  { path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [AuthGuard]},
  { path: 'deletar/:id', component: DeletarComponent, canActivate: [AuthGuard]},
  { path: 'meus-agendamentos', component: MeusAgendamentosComponent, canActivate: [AuthGuard]},
  { path: 'atualizar-perfil', component: AtualizarPerfilComponent, canActivate: [AuthGuard]},
  { path: 'atualizar-senha', component: AtualizarSenhaComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: "/home" } // Mova esta rota para o final
];
