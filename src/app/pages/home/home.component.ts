import { AfterViewInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/store/app/app.state';
import { UpdateNavigatorPosition } from 'src/app/shared/store/app/app.actions';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  private track: HTMLElement | null = null;
  @Select(AppState.navigatorPosition) private navigatorPosition$: Observable<string>;

  public mouseDownAt: string = "0";
  public prevPercentage: string = "0";

  constructor(private store: Store) {
    this.navigatorPosition$.subscribe(navigatorPosition => {
      this.prevPercentage = navigatorPosition;
    }); }

  ngAfterViewInit() {
    this.track = document.getElementById("image-track");
    this.track?.animate({
        transform: `translate(${this.prevPercentage}%, -50%)`
      }, { duration: 0, fill: "forwards" });
      
    // Array.prototype.forEach.call(this.track?.getElementsByClassName("image"), (image) => {
    //   image.animate({
    //     objectPosition: `${100 + this.prevPercentage}% center`
    //   }, { duration: 0, fill: "forwards" });
    // });

    this.track?.addEventListener("pointerdown", (event: Event) => {
      this.mouseDownAt = (event as PointerEvent).clientX.toString();
    });
    window.addEventListener("pointerup", (event: Event) => {
      this.mouseDownAt = "0";
      this.prevPercentage = this.track?.dataset["prevPercentage"] ?? "0";
    });

    window.addEventListener("pointermove", (event: Event) => {
      if(this.mouseDownAt === "0") return;

      const mouseDelta = (parseFloat(this.track?.dataset["mouseDownAt"] ?? "0") - (event as PointerEvent).clientX) / 100;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = parseFloat(this.track?.dataset["prevPercentage"] ?? "0") + percentage;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      this.track?.animate({
          transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

      Array.prototype.forEach.call(this.track?.getElementsByClassName("image"), (image) => {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      });
      
      this.store.dispatch(new UpdateNavigatorPosition(nextPercentage.toString()));
    });
  }

  ngOnDelete() {
    this.track?.removeEventListener("pointerdown", (event: Event) => {
      this.mouseDownAt = (event as PointerEvent).clientX.toString();
    });
    window.removeEventListener("pointerup", (event: Event) => {
      this.mouseDownAt = "0";
      this.prevPercentage = this.track?.dataset["prevPercentage"] ?? "0";
    });
  }

}
