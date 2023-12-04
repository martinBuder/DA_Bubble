import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { UploadService } from 'src/app/services/userDatas/upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

  export class ImageUploadComponent implements OnInit {
    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    errorMessage :string = '';
    preview = '';
   
    constructor(
      private uploadService: UploadService,
      public openCloseService: OpenCloseService
      ) {}

  ngOnInit(): void {
  }
  
  upload(): void {
    this.progress = 0;   
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log('here is if next');
              
              this.progress = Math.round((100 * event.loaded) / event.total);
              console.log(event);
              
            } else if (event instanceof HttpResponse) {
              this.errorMessage = event.body.message;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'Could not upload the image!';
            }
            this.currentFile = undefined;
          },
        });
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
