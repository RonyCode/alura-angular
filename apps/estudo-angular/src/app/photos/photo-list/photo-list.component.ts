import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private service: PhotoService
  ) {}

  ngOnInit(): void {
    this.userName = this.activateRoute.snapshot.params['userName'];
    this.photos = this.activateRoute.snapshot.data['photos'];
  }

  load() {
    this.service
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe({
        next: (photos) => {
          this.filter = '';
          this.photos.push(...photos);
          this.photos = this.photos.concat(photos);
          if (!photos.length) this.hasMore = false;
        },
        error: (error) => console.log(error),
      });
  }
}
