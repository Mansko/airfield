import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
    

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class HomeComponent {  
  slides = [
    {
      title: 'Facial Detection',
      description: 'Detect faces in a video stream and draw a bounding box around them.',
      imgsrc: 'assets/images/facial-detection.jpg',
      link: '/facial-detection'
    },
    {
      title: 'Pose Estimation',
      description: 'Detect poses in a video stream and draw a skeleton around them.',
      imgsrc: 'assets/images/pose-estimation.png',
      link: '/pose-estimation'
    },
    {
      title: 'Sound Recognition',
      description: 'Detect sounds in a video stream and draw a bounding box around them.',
      imgsrc: 'assets/images/sound-recognition.jpg',
      link: '/sound-recognition'
    }
  ];

  constructor(private router: Router) { }

  public onClick(link: string) {
    this.router.navigate([link]);
  }

}