import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMemberComponent } from 'src/app/components/add-member/add-member.component';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AddMemberComponent, PopoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports:[AddMemberComponent, PopoverComponent]
})
export class SharedModule { }
