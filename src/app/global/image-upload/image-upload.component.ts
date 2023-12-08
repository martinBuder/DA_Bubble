import { Component } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { FireStorageService } from 'src/app/services/firebase/fire-storage.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

  export class ImageUploadComponent {
 
    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    errorMessage :string = '';
    preview = '';
   
    constructor(
      private fireStorageService: FireStorageService,
      public openCloseService: OpenCloseService
      ) {}
 
  upload(): void {
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.fireStorageService.uploadFile(this.currentFile)
        this.currentFile = undefined;
      }
      this.selectedFiles = undefined;
    }
  }

  selectFile(event: any): void {
    this.errorMessage = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
          reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
          reader.readAsDataURL(this.currentFile);
      }
    }
  }
}
