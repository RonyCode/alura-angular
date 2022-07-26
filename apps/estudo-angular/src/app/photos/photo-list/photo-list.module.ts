import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoListComponent } from './photo-list.component';
import { LoadButtonComponent } from './load-button/load-button/load-button.component';
import { PhotosComponent } from './photos/photos.component';
import { FilterByDescriptionPipe } from './filter-by-description-pipe';
import { PhotoModule } from '../photo/photo.module';
import { CardModule } from '../../shared/components/card/card.module';
import { SearchModule } from './search/search.module';
import { DarkOnHoverModule } from '../../shared/directives/dark-on-hover/dark-on-hover.module';

@NgModule({
  declarations: [
    PhotoListComponent,
    LoadButtonComponent,
    PhotosComponent,
    FilterByDescriptionPipe,
  ],
  imports: [
    CommonModule,
    PhotoModule,
    CardModule,
    SearchModule,
    DarkOnHoverModule,
  ],
})
export class PhotoListModule {}
