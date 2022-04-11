import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule, ToolbarModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
