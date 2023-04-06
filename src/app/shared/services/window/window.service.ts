import { Injectable } from '@angular/core';

declare global {
  interface Window {
    common: {
      showWindow: () => void;
      minimize: () => void;
      onMinimize: (cb: () => void) => void;
      maximize: () => void;
      onMaximize: (cb: () => void) => void;
      restore: () => void;
      close: () => void;
      toggleDevTools: () => void;
    };
  }
}

const NODE_ENV = window.common ? true : false;

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  constructor() {}

  public showWindow() {
    if (NODE_ENV) window.common.showWindow();
    else return;
  }

  public toggleDevTools() {
    if (NODE_ENV) window.common.toggleDevTools();
    else return;
  }

  public minimize() {
    if (NODE_ENV) window.common.minimize();
    else return;
  }

  public onMinimize(cb: () => void) {
    if (NODE_ENV) window.common.onMinimize(cb);
    else return;
  }

  public maximize() {
    if (NODE_ENV) window.common.maximize();
    else return;
  }

  public onMaximize(cb: () => void) {
    if (NODE_ENV) window.common.onMaximize(cb);
    else return;
  }

  public restore() {
    if (NODE_ENV) window.common.restore();
    else return;
  }

  public closeWindow() {
    if (NODE_ENV) window.common.close();
    else return;
  }
}
