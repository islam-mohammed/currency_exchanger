import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TextComponent } from './text.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [TextComponent],
  declarations: [TextComponent],
  providers: [],
})
export class TextModule {}
