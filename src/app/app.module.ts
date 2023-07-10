import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoDialogComponent } from './modules/components/todo/todo-dialog/todo-dialog.component';
import { TodoInputComponent } from './modules/components/todo/todo-input/todo-input.component';
import { TodoDateTimePickComponent } from './modules/components/todo/todo-date-time-pick/todo-date-time-pick.component';
import { TodoTaskComponent } from './modules/components/todo/todo-task/todo-task.component';
import { TodoListComponent } from './modules/components/todo/todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateFormComponent } from './modules/components/modal/update-form/update-form.component';
import { ConfirmFormComponent } from './modules/components/modal/confirm-form/confirm-form.component';
import { TodoFilterComponent } from './modules/components/todo-filter/todo-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoDialogComponent,
    TodoInputComponent,
    TodoDateTimePickComponent,
    TodoTaskComponent,
    TodoListComponent,
    UpdateFormComponent,
    ConfirmFormComponent,
    TodoFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
