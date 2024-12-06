import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButton, MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NgClass } from '@angular/common';
import { AuthService } from '../shared/auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserProfile } from '../shared/models/user-profile';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

interface Menu {
  title: string;
  route: string;
  isCurrent: boolean;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, MatFabButton, MatIcon, MatButton, NgClass, RouterModule, MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public menuList: Menu[];
  public profile: UserProfile;
  private router: Router = new Router();

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.route.data
      .subscribe((data) => {
        this.profile = data['userProfile'] as UserProfile;
      });
    this.menuList = [
      { title: 'TRAINING', route: '/training', isCurrent: false },
    ];
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout();
  }

}
