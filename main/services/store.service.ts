import * as Store from 'electron-store';
import { screen } from 'electron';

export class StoreService {
  private static instance: StoreService;
  private store: Store | null = null;
  private defaultBounds: [number, number] | null = null;
  private defaultPosition: [number, number] | null = null;
  private defaultTheme: string = 'system';

  constructor() {}

  public static getInstance(): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = new StoreService();
    }
    return StoreService.instance;
  }

  public start() {
    console.log('Starting system service...');
    this.store = new Store();
    const monitor = screen.getPrimaryDisplay().size;
    this.defaultBounds = [monitor.width / 4, monitor.height / 4];
    this.defaultPosition = [monitor.width / 2, monitor.height / 2];
  }

  public getWindowSize(window: string): [number, number] {
    const size = this.store.get(`${window}:winsize`) as [number, number];
    if (size) return size;
    this.store.set(`${window}:winsize`, this.defaultBounds);
    return this.defaultBounds;
  }

  public setWindowSize(window: string, bounds: number[]) {
    this.store.set(`${window}:winsize`, bounds);
    console.log(`Stored ${window} size changed to:`, bounds);
  }

  public getWindowPosition(window: string): [number, number] {
    const size = this.store.get(`${window}:winposition`) as [number, number];
    if (size) return size;
    this.store.set(`${window}:winposition`, this.defaultPosition);
    return this.defaultPosition;
  }

  public setWindowPosition(window: string, position: number[]) {
    this.store.set(`${window}:winposition`, position);
    console.log(`Stored ${window} position changed to:`, position);
  }
}
