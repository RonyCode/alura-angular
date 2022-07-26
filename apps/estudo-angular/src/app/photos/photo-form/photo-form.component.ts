import { Component, OnInit } from '@angular/core';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  photoForm: FormGroup | any;
  file: File | any;
  preview: string | any;
  percentDone: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private route: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upLoad() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    this.photoService
      .upLoad(description, allowComments, this.file)
      .pipe(
        finalize(() => {
          this.route.navigate(['/user', this.userService.getUserName()]);
        })
      )
      .subscribe({
        next: (event) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.percentDone = Math.round((100 * event.loaded) / event.total!);
            console.log(this.percentDone);
          } else if (event instanceof HttpResponse) {
            this.alertService.success('Upload complete!', true);
          }
        },
        error: (err) => {
          console.log(err);
          this.alertService.danger('Do not complete upload!', true);
        },
      });
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
