import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";

  constructor(
    // private camera: CameraCordova
  ) {
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = (await Preferences.get({ key: this.PHOTO_STORAGE })).value as string;
    this.photos = JSON.parse(photoList) || [];
    // If running on the web...
    // if (!Capacitor.isNative) {
    //   // Display the photo by reading into base64 format
    //   for (let photo of this.photos) {
    //     if(photo) {
    //       // Read each saved photo's data from the Filesystem
    //       const readFile = await Filesystem.readFile({
    //         path: photo.filepath,
    //         directory: FilesystemDirectory.Data
    //       });
        
    //       // Web platform only: Load the photo as base64 data
    //       photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    //     }
    //   }
    // }
  }

  /* Use the device camera to take a photo:
  // https://capacitor.ionicframework.com/docs/apis/camera
  
  // Store the photo data into permanent file storage:
  // https://capacitor.ionicframework.com/docs/apis/filesystem
  
  // Store a reference to all photo filepaths using Storage API:
  // https://capacitor.ionicframework.com/docs/apis/storage
  */
  public async addNewToGallery() {
    // Take a photo
    // const capturedPhoto = await Camera.getPhoto({
    //   resultType: CameraResultType.Uri, // file-based data; provides best performance
    //   source: CameraSource.Camera, // automatically take a new photo with the camera
    //   quality: 100, // highest quality (0 to 100)
    //   allowEditing: true,
    //   saveToGallery: true,
    //   webUseInput: true,
    //   promptLabelHeader: 'Publier une photo',
    //   promptLabelCancel: 'Annuler'
    // });
    
    //console.log('capturedPhoto: ', capturedPhoto);
    // const savedImageFile = await this.savePicture(capturedPhoto);
    //console.log('savedImageFile: ', savedImageFile);

    // Cache all photo data for future retrieval
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    }).then(() => {
      // Add new photo to Photos array
      // this.photos.unshift(savedImageFile);
    }) .catch(e => {
      console.log(e);
    });

    // return savedImageFile;
  }

  async takePhoto(): Promise<any> {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   targetWidth: 1000,
    //   targetHeight: 1000,
    //   sourceType: this.camera.PictureSourceType.CAMERA,
    // };
    // return await this.camera.getPicture(options);
  }

  // capturePhoto(): Promise<CameraPhoto> {
    // return Camera.getPhoto({
      // resultType: CameraResultType.Uri, // file-based data; provides best performance
      // source: CameraSource.Camera, // automatically take a new photo with the camera
      // quality: 100 // highest quality (0 to 100)
    // });
  // }

  // Save picture to file on device
  // private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    // const base64Data = await this.readAsBase64(cameraPhoto);
    //console.log('base64Data: ', base64Data);

    // Write the file to the data directory
    // const fileName = new Date().getTime() + '.jpeg';
    // const savedFile = await Filesystem.writeFile({
    //   path: fileName,
    //   data: `data:image/jpeg;base64,${base64Data}`,
    //   directory: FilesystemDirectory.Data
    // });
    //console.log('savedFile: ', savedFile);

    // if (Capacitor.isNative) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      //console.log('result isNative savedFile: ', { filepath: savedFile.uri, webviewPath: Capacitor.convertFileSrc(savedFile.uri)});
      // return {
      //   filepath: savedFile.uri,
      //   base64Data: `data:image/jpeg;base64,${base64Data}`,
      //   webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      // };
    // }
    // else {
      // Use webPath to display the new image instead of base64 since it's 
      // already loaded into memory
      //console.log('result isWeb savedFile: ', { filepath: fileName, webviewPath: cameraPhoto.webPath});
      // return {
      //   filepath: fileName,
      //   base64Data: base64Data,
      //   webviewPath: cameraPhoto.webPath
      // };
    // }
  // }

  // Read camera photo into base64 format based on the platform the app is running on
  // private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    // if (Capacitor.isNative) {
      // Read the file into base64 format
      // const file = await Filesystem.readFile({
      //   path: cameraPhoto.path
      // });

      // return file.data;
    // }
    // else {
      // Fetch the photo, read as a blob, then convert to base64 format
      // const response = await fetch(cameraPhoto.webPath!);
      //console.log('response: ', response);
      // const blob = await response.blob();
      //console.log('blob: ', blob);

    //   return await this.convertBlobToBase64(blob) as string;  
    // }
  // }

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(photo: Photo, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

    // delete photo file from filesystem
    // const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    // await Filesystem.deleteFile({
    //   path: filename,
    //   directory: FilesystemDirectory.Data
    // });
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

export interface Photo {
  filepath: string;
  base64Data: string,
  webviewPath: string;
}
