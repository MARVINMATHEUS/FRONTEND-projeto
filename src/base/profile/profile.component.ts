import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { UserProfile } from '../../shared/models/user-profile';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../shared/service/base.service';
import { HttpClient } from '@angular/common/http';
import { URLS } from '../../shared/urls';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatTableModule,
    MatFormFieldModule,
    MatInput,
    MatIconButton,
    MatIcon,
    FormsModule,
    NgClass,
    MatFabButton,
    MatCardTitle,
    MatCardContent,
    MatButton,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userProfile: UserProfile;

  private service: BaseService<UserProfile>

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.service = new BaseService<UserProfile>(http, URLS.USERPROFILE + "update_profile/");
    this.route.parent.data
      .subscribe((data) => {
        this.userProfile = data['userProfile'] as UserProfile;
      });
  }

  onSubmit(): void {
    this.service.save(this.userProfile).subscribe({
      next: () => {
      },
      error: () => {
      },
    });
  }

}
