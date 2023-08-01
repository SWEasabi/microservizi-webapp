import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AuthGuard } from "./guards/auth.guard";
import { ApiGatewayInterceptor } from "./interceptor/api-gateway.interceptor";

const routes: Routes = [
  {
    path: "private-area", loadComponent: () => import("./feature/private-area/private-area.component").then (c => c.PrivateAreaComponent),
    canActivateChild: [AuthGuard],
    children: [
      { path: "areas/all", loadComponent: () => import("./feature/areas-list/areas-list.component").then (c => c.AreasListComponent) },
      { path: "areas/new", loadComponent: () => import("./feature/area-new/area.component").then (c => c.AreaComponent) },
      { path: "lamps/all", loadComponent: () => import("./feature/lamps-list/lamps-list.component").then (c => c.LampsListComponent) },
      { path: "sensors/all", loadComponent: () => import("./feature/sensors-list/sensors-list.component").then (c => c.SensorsListComponent) },
      { path: "lamps/new", loadComponent: () => import("./feature/lamp/lamp.component").then (c => c.LampComponent) },
      { path: "sensors/new", loadComponent: () => import("./feature/sensor/sensor.component").then (c => c.SensorComponent) },
      { path: "areas/:idArea", loadComponent: () => import("./feature/area-new/area.component").then (c => c.AreaComponent) },
      { path: "**", redirectTo: "areas/all", pathMatch: "full" }
    ]
  },
  { path: "login", loadComponent: () => import("./feature/authentication/authentication.component").then (c => c.AuthenticationComponent) },
  { path: "**", redirectTo: "private-area", pathMatch: "full" }
];

@NgModule ({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot (routes),
    HttpClientModule
  ],
  exports: [],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiGatewayInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
