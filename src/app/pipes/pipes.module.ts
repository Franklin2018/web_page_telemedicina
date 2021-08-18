import { NgModule } from '@angular/core';

import { ImagenPipe, SafePipe } from './imagen.pipe';



@NgModule({
  declarations: [ ImagenPipe,SafePipe ],
  exports: [ ImagenPipe,SafePipe ],
})
export class PipesModule { }
