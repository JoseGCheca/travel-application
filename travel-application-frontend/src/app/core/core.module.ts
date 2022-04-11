import { NgModule } from '@angular/core';


import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';

@NgModule({
  exports: [HeaderModule, FooterModule]
})
export class CoreModule { }
