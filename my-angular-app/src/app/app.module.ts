import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './component/app-routing.module';
import { AppComponent } from './component/app.component';
import { UserCreationDialogComponent } from './popup/user-creation-dialog.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentDialogComponent } from './popup/equipment-dialog.component';
import { DeleteDialogComponent } from './popup/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreationDialogComponent,
    EquipmentDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwtToken'),
        allowedDomains: ['http://127.0.0.1:3333']
      }
  })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }