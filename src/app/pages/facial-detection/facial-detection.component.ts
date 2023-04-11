import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MediaStreamDirective } from 'src/app/shared/directive/media-stream.directive';
import { FacialDetectionService } from 'src/app/shared/services/facial-detection/facial-detection.service';


@Component({
  templateUrl: './facial-detection.component.html',
  styleUrls: ['./facial-detection.component.css']
})
export class FacialDetectionComponent implements AfterViewInit {
  @ViewChild(MediaStreamDirective)
  public mediaStream!: MediaStreamDirective;

  public picSrc!: string | undefined;
  public videoSrc!: SafeUrl;
  public canvas: HTMLCanvasElement | null = null;
  public ctx: CanvasRenderingContext2D | null = null;

  private rafId: number;

  constructor(private sanitaze: DomSanitizer, private detector: FacialDetectionService) { }

  public async ngAfterViewInit(): Promise<void> {
    this.mediaStream.play();
    this.canvas = document.getElementById('output') as HTMLCanvasElement;
    this.canvas.width  = 1078;
    this.canvas.height = 1508;
    this.ctx = this.canvas?.getContext('2d');
    console.log(this.canvas);
    console.log(this.ctx);
  }

  public ngOnDestroy(): void {
    this.mediaStream.stop();
    window.cancelAnimationFrame(this.rafId);
  }

  public async onPic(): Promise<void> {
    this.detector.estimateFaces(this.mediaStream.element, false).then((faces) => {
      console.log(faces)
      this.picSrc = 'true';
      console.log(this.mediaStream.element)
      this.detector.drawResults(this.mediaStream.element, this.ctx, faces, false, false);
    });
    // this.picSrc = this.mediaStream.take();
    // console.log(this.picSrc)
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
