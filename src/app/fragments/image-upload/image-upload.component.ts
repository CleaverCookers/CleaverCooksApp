import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Ingredient} from "../../models/ingredient";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  constructor() { }

  @Output() onImageUploaded: EventEmitter<string> = new EventEmitter<string>();
  @Input() public imgUrl:string | null = null;

  public image:File|null = null;
  public temporaryImageUrl:string | ArrayBuffer | null = null;
  public isUploading:boolean = false;

  ngOnInit(): void {
  }

  onFileSelected($event: Event) {
    this.image = ($event.target as HTMLInputElement).files![0];
    if (!this.image) return;
    let reader = new FileReader();

    reader.readAsDataURL(this.image); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.temporaryImageUrl = event.target!.result;
      this.imgUrl = null;
      this.upload();
    }
  }

  async upload(){
    if(!this.image) return;
    this.isUploading = true;
    let formData = new FormData();
    formData.append('image', this.image);
    let response = await fetch(environment.uploadApiUrl, {
      method: 'POST',
      body: formData
    });
    this.temporaryImageUrl = null;
    this.imgUrl = await response.text();
    this.isUploading = false;
    this.onImageUploaded.emit(this.imgUrl);
  }
}
