import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'ap-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PhotoDetailsComponent implements OnInit {
  photoId!: number;

  photo$!: Observable<Photo>;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.photoId = this.route.snapshot.params['photoId'];
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe({
      next: () => {},
      error: (err) => {
        console.log(err);
        this.router.navigate(['not-found']);
      },
    });
  }

  like(photo: Photo) {
    this.photoService.like(photo.id).subscribe({
      next: (liked) => {
        if (liked) {
          this.photo$ = this.photoService.findById(photo.id);
        }
      },
      error: (err) => {},
    });
  }
  remove() {
    this.photoService.removePhoto(this.photoId).subscribe({
      next: () => {
        this.alertService.success('photo removed!', true);
        this.router.navigate(['/user', this.userService.getUserName()]);
      },
    });
  }
}
