import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PhotoService } from '../../photo/photo.service';
import { Observable, switchMap } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId!: number;
  comments$!: Observable<PhotoComment[]>;
  commentForm: FormGroup | any;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)],
    });
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;
    this.comments$ = this.photoService
      .addComment(this.photoId, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(
        tap(() => {
          this.commentForm.reset();
          alert('Comentário inserido com sucesso');
        })
      );
  }
}
