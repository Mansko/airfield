import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TitlebarComponent } from './shared/components/titlebar/titlebar.component';
import { FacialDetectionComponent } from './pages/facial-detection/facial-detection.component';
import { PoseEstimationComponent } from './pages/pose-estimation/pose-estimation.component';
import { SoundRecognitionComponent } from './pages/sound-recognition/sound-recognition.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './shared/store/app/app.state';
import { BackButtonComponent } from './shared/components/back-button/back-button.component';
import { HTMLVideoDirective } from './shared/directive/htmlvideo.directive';
import { MediaStreamDirective } from './shared/directive/media-stream.directive';
import { SwiperModule } from 'swiper/angular';
import { FacialDetectionService } from './shared/services/facial-detection/facial-detection.service';

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    HomeComponent,
    BackButtonComponent,
    FacialDetectionComponent,
    PoseEstimationComponent,
    SoundRecognitionComponent,
    BackButtonComponent,
    HTMLVideoDirective,
    MediaStreamDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    NgxsModule.forRoot([AppState]),
  ],
  providers: [FacialDetectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
