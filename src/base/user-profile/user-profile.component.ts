import {Component, OnInit, ViewChild, viewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../../shared/urls';
import {MatCard} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {BaseService} from '../../shared/service/base.service';
import {NavigationExtras, Router} from '@angular/router';
import {UserProfile} from '../../shared/models/user-profile';
import {GroupMuscle} from '../../shared/models/group_muscle';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatCard,
    MatTableModule,
    MatFormFieldModule,
    MatInput,
    MatIconButton,
    MatIcon,
    FormsModule,
    NgClass,
    MatFabButton,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  public dataSource: UserProfile[] = [];
  public displayedColumns = ['id', 'login', 'name', 'age', 'weight', 'height', 'actions'];
  public searchName: string = '';

  private router: Router = new Router();

  private service: BaseService<UserProfile>
  private grupoMuscularService: BaseService<GroupMuscle>

  constructor(private http: HttpClient) {
    this.service = new BaseService<UserProfile>(http, URLS.USERPROFILE);
    this.grupoMuscularService = new BaseService<GroupMuscle>(http, URLS.GROUP_MUSCLE);
  }

  public ngOnInit(): void {
    this.search();
    this.grupoMuscularService.getAll().subscribe(value => console.log("raimundo", value));
  }

  public search(resetIndex: boolean = false): void {
    this.service.clearParameter();
    this.service.addParameter('name', this.searchName);
    this.service.getAll().subscribe({
      next: (data: UserProfile[]) => {
        this.dataSource = data;
        console.log('UserProfile load: ', data)
      },
      error: (err) => {
        console.error('Error loading userprofile');
      }
    });
  }

  public deleteObject(id: number): void {
    this.service.delete(id).subscribe({
      next: (_) => {
        this.search();
      },
      error: (_) => {
        console.error('Error deleting userprofile');
      }
    });
  }

  public goToPage(route: string): void {
    const extras: NavigationExtras = {queryParamsHandling: 'merge'};
    this.router.navigate([route], extras).then();
  }

}


