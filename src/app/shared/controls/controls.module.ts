import { SelectModule } from './select/select.module';
import { NgModule } from '@angular/core';
import { TextModule } from './text/text.module';

@NgModule({
  imports: [SelectModule, TextModule],
  exports: [SelectModule, TextModule],
  declarations: [],
  providers: [],
})
export class ControlsModule {}
