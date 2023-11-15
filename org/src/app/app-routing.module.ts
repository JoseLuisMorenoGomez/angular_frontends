// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodeInfoPopupComponent } from 'path-to-your-node-info-popup.component';

const routes: Routes = [
  { path: 'node-info', component: NodeInfoPopupComponent },
  // Agrega más rutas según sea necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
