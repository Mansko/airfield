import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FacialDetectionComponent } from './pages/facial-detection/facial-detection.component';
import { PoseEstimationComponent } from './pages/pose-estimation/pose-estimation.component';
import { SoundRecognitionComponent } from './pages/sound-recognition/sound-recognition.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'facial-detection', component: FacialDetectionComponent },
  { path: 'pose-estimation', component: PoseEstimationComponent },
  { path: 'sound-recognition', component: SoundRecognitionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
