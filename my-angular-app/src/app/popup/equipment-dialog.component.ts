import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentDialogService } from './equipment-dialogService';

export interface DialogData {
  id: number | null;
  uid: string;
  brand: string;
  equipment: string;
}

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: 'equipment-dialog.component.html',
})
export class EquipmentDialogComponent {
  private originalData: DialogData;

  constructor(
    private dialogRef: MatDialogRef<EquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private equipmentService: EquipmentDialogService) {
    this.originalData = { ...data };
  }


  populateRandomData(): void {
    this.equipmentService.getRandomData().subscribe(response => {
      this.data.uid = response.uid;
      this.data.brand = response.brand;
      this.data.equipment = response.equipment;
    });
  }

  onSave(): void {
    if (this.data.id) {
      this.equipmentService.editEquipment(this.data).subscribe(() => {
        this.dialogRef.close(this.data);
      });
    } else {
      this.equipmentService.addEquipment(this.data).subscribe(() => {
        this.dialogRef.close(this.data);
      });
    }
  }

  onNoClick(): void {
    Object.assign(this.data, this.originalData);
    this.dialogRef.close();
  }
}
