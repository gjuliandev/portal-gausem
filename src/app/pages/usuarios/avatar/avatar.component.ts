import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { IUsuario } from 'src/app/interfaces/usuario';
import { SubirFicheroService } from 'src/app/providers/ficheros/subir-fichero.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: File = Object(null);

  local_data: any;
  
  constructor( private subirFicheroService: SubirFicheroService,
    public dialogRef: MatDialogRef<AvatarComponent>, @Inject(MAT_DIALOG_DATA) public data: IUsuario) {
      this.local_data = { ...data };
      console.log(JSON.stringify(this.local_data));
     }

  ngOnInit(): void {
  }

  doAction(){
    if (this.file) {
      this.subirFicheroService.upload(this.file, 'avatar', this.local_data._id)
        .then( x=> {
          console.log('subido') ;
          this.dialogRef.close();
        });
    }
   
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // IMAGEN
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      const imageName = 'image.png';
      const imageBlob = this.dataURItoBlob(this.croppedImage);
      const imageFile = new File([imageBlob], imageName, {type: 'image/png'});
      this.file = imageFile;
  }

  dataURItoBlob(croppedImage: any) {
   const byteString = atob(croppedImage.split(',')[1]);
   const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0];
   const ab = new ArrayBuffer(byteString.length);
   const ia = new Uint8Array(ab);
   for (let i = 0; i < byteString.length; i++) {
     ia[i] = byteString.charCodeAt(i);
   }

   const blob = new Blob([ab], {type: mimeString});
   return blob; 
  }

  imageLoaded(image: LoadedImage) {
      // show cropper
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
      // show message
  }

}
