import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from './userService';

@Component({
  selector: 'app-user-creation-dialog',
  templateUrl: './user-creation-dialog.component.html',
  styleUrls: ['./user-creation-dialog.component.css']
})
export class UserCreationDialogComponent {
  newUser: any = {};

  constructor(
    private dialogRef: MatDialogRef<UserCreationDialogComponent>,
    private userService: UserService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  createUser() {
    console.log('Creating user:', this.newUser);
    this.userService.createUser(this.newUser).subscribe(response => {
      console.log('User created successfully', response);
      this.closeDialog();
    }, error => {
      console.error('Error creating user', error.error, error.status, error.message);
    });
  }
}