import { Routes } from '@angular/router';
import { LoginComponent } from '../base/login/login.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { MainComponent } from '../base/main.component';
import { UserProfileResolver } from '../shared/resolver/user-profile.resolver';
import { ProfileComponent } from '../base/profile/profile.component';
import { ExerciseComponent } from '../base/exercise/exercise.component';
import { ExerciseFormComponent } from '../base/exercise/form/exercise-form.component';
import { TrainingComponent } from '../base/training/training.component';
import { TrainingResolver } from '../shared/resolver/training.resolver';
import { TrainingExerciseResolver } from '../shared/resolver/training-exercise.resolver';
import { RegisterComponent } from '../base/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: "",
    component: MainComponent,
    resolve: {
      userProfile: UserProfileResolver,
    },
    children: [
      {
        path: 'userprofile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'training',
        component: TrainingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'training/:trainingId/exercise',
        component: ExerciseComponent,
        canActivate: [AuthGuard],
        resolve: {
          training: TrainingResolver,
        }
      },
      {
        path: 'training/:trainingId/exercise/:action',
        component: ExerciseFormComponent,
        canActivate: [AuthGuard],
        resolve: {
          training: TrainingResolver,
          trainingExercise: TrainingExerciseResolver,
        }
      },

    ],
  },
  {
    path: '',
    redirectTo: '/training',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/training'
  },
];
