import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkOnHoverDirective } from './dark-on-hover.directive';

@NgModule({
  declarations: [DarkOnHoverDirective],
  imports: [CommonModule],
  exports: [DarkOnHoverDirective],
})
export class DarkOnHoverModule {}
