import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {CleaverCooksApi} from "../../services/cleaver-cooks-api";
import {Ingredient} from "../../models/ingredient";
import {Element} from "../../models/element";
import {ElementPickerComponent} from "../../fragments/element-picker/element-picker.component";
import {MatButtonModule} from "@angular/material/button";
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-receipts-new-page',
  templateUrl: './receipts-new-page.component.html',
  styleUrls: ['./receipts-new-page.component.scss'],
})
export class ReceiptsNewPageComponent {
  constructor(private formBuilder: FormBuilder, private apollo:Apollo,private _bottomSheet: MatBottomSheet) { }

  public isRecipeSaved = false;
  public form = this.formBuilder.group({
    name: '',
    description:''
  });
  public elements:Element[] = [];
  public elementPickerDisplayed = false;

  addElement(element:Element){
    this.elementPickerDisplayed = false;
    console.log("Adding element : "+element)
    this.elements.push(element);
  }

  toggleElementPicker(){
    this.elementPickerDisplayed = !this.elementPickerDisplayed;
  }
  onSubmit(){
    console.log("Updating / inserting recipe")
    this.isRecipeSaved = true;
  }

  editElement(element: Element) {

  }

  showElementPicker() {
    const bottomSheetRef = this._bottomSheet.open(ElementPickerComponent, {
      ariaLabel: 'Share on social media'
    });
    bottomSheetRef.afterDismissed().subscribe((element)=>{
      console.log("Dismissed"+element)
    });
  }
}
