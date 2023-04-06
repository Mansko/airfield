import { app } from 'electron';
if (require('electron-squirrel-startup')) app.quit();
import { WindowService } from './window.service';
import { SystemService } from './system.service';
import { StoreService } from './store.service';

export class AppService {
  private static instance: AppService;

  private constructor() {}

  public static getInstance(): AppService {
    if (!AppService.instance) AppService.instance = new AppService();
    return AppService.instance;
  }

  public start() {
    app.on('ready', () => {
      console.log('Starting app service...');
      StoreService.getInstance().start();
      SystemService.getInstance().start();
      WindowService.getInstance().start();
    });
    this.handleApplicationEvents();
  }

  private handleApplicationEvents() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}
