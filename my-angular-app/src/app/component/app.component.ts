import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UserCreationDialogComponent } from '../popup/user-creation-dialog.component';
import { DeleteDialogComponent } from '../popup/delete-dialog.component';
import { EquipmentDialogComponent } from '../popup/equipment-dialog.component';
import { DeleteService } from '../popup/delete-dialogService';
import { EquipmentDialogService } from '../popup/equipment-dialogService';
import { ChangeDetectorRef } from '@angular/core';

export interface Equipment {
  id: number | null;
  uid: string;
  brand: string;
  equipment: string;
}

@Component({
  selector: 'app-root',
  templateUrl: '../view/app.component.html',
  styleUrls: ['../css/app.component.css']
})

export class AppComponent {
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  userData: Equipment[] = [];
  dataSource: Equipment[] = [];
  baseDataSource: Equipment[] = [];

  displayedColumns: string[] = ['id', 'uid', 'brand', 'equipment', 'edit', 'delete'];

  constructor(
    private http: HttpClient, 
    private dialog: MatDialog,
    private deleteService: DeleteService,
    private equipmentService: EquipmentDialogService,
    private cdr: ChangeDetectorRef) {
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
      if (this.isLoggedIn) {
        this.fetchUserData();
      }
  }
  

  login(): void {
    this.http.post('http://localhost:3333/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        const token = response.token;
        localStorage.setItem('jwtToken', token);

        this.isLoggedIn = true;
        console.log('Connection successful.');

        this.email = '';
        this.password = '';

        this.fetchUserData();
      },
      error: error => {
        console.error('An error occurred during the login process.', error);
      }
    });
  }

  logout(): void {
    // Effacer toute les variables
    localStorage.removeItem('jwtToken');
    this.isLoggedIn = false;
    this.userData = [];
    this.baseDataSource = [];
    this.dataSource = [];
    this.email = '';
    this.password = '';
  }

  openUserCreationDialog() {
    const dialogRef = this.dialog.open(UserCreationDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  fetchUserData(): void {
    this.http.get<Equipment[]>('http://localhost:3333/userData').subscribe({
      next: (data) => {
        this.userData = data;
        this.baseDataSource = data;
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  addAndEditItem(data?: Equipment): void {
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      data: data || { id: null, uid: '', brand: '', equipment: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Item was added or edited');
        
        if (result.id) {
          this.equipmentService.editEquipment(result).subscribe(() => {
            this.fetchUserData(); 
            this.cdr.detectChanges();
          });
        } else {
          this.equipmentService.addEquipment(result).subscribe(() => {
            this.fetchUserData(); 
            this.cdr.detectChanges();
          });
        }
      }
    });
  }

  deleteItem(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteService.deleteEquipment(id).subscribe(() => {
          console.log('Item was deleted');
          this.fetchUserData();
          this.cdr.detectChanges();
        }, error => {
          console.error('Error deleting the item:', error);
        });
      }
    });
  }

  // Filtering section
  
  filterId: string = '';
  filterUID: string = '';
  filterBrand: string = '';
  filterEquipment: string = '';

  applyFilter() {
    let filteredData = [...this.baseDataSource];
  
    if (this.filterId) {
      filteredData = filteredData.filter(item => item.id!.toString().includes(this.filterId));
    }
    if (this.filterUID) {
      filteredData = filteredData.filter(item => item.uid.includes(this.filterUID));
    }
    if (this.filterBrand) {
      filteredData = filteredData.filter(item => item.brand.includes(this.filterBrand));
    }
    if (this.filterEquipment) {
      filteredData = filteredData.filter(item => item.equipment.includes(this.filterEquipment));
    }
  
    this.dataSource = filteredData;
  }
}