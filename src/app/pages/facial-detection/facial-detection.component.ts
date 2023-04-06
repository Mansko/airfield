import { Component, ViewChild, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MediaStreamDirective } from 'src/app/shared/directive/media-stream.directive';
import '@tensorflow-models/face-detection';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

const DETECTOR_CONFIG: faceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig = {
  runtime: 'mediapipe',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
  refineLandmarks: true,
  maxFaces: 4,
}

@Component({
  templateUrl: './facial-detection.component.html',
  styleUrls: ['./facial-detection.component.css']
})
export class FacialDetectionComponent implements OnInit {
  @ViewChild(MediaStreamDirective)
  public mediaStream!: MediaStreamDirective;

  public picSrc!: string;
  public videoSrc!: SafeUrl;

  private model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  private detector: any;
  private rafId: number;

  constructor(private sanitaze: DomSanitizer) { }

  public async ngOnInit(): Promise<void> {
    this.detector = await faceLandmarksDetection.createDetector(this.model, DETECTOR_CONFIG);
    this.mediaStream.play();
  }

  public ngOnDestroy(): void {
    this.mediaStream.stop();
    window.cancelAnimationFrame(this.rafId);
  }

  public async predict(): Promise<void> {
    const faces = await this.detector.estimateFaces(this.mediaStream.element, {flipHorizontal: false});
    console.log(faces);
    this.rafId = requestAnimationFrame(() => {
      this.predict()
    });
  }

  public async onPic(): Promise<void> {
    this.picSrc = this.mediaStream.take();
    this.predict();
  }

  public onVideo(data: Blob): void {
    this.videoSrc = this.sanitaze.bypassSecurityTrustUrl(
      URL.createObjectURL(data)
    );
  }

  public onError(err: DOMException | ReferenceError): void {
    if (err instanceof DOMException) {
      alert('Impossible to instanciate MediaStream' + err);
    } else {
      alert('Impossible to instanciate MediaRecorder' + err);
    }
  }

}
