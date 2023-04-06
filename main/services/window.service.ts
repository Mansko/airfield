import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { StoreService } from './store.service';

const ICON_PATH = 'assets/icons/icon-128x128.png';
const WINDOW_PATH = 'dist/airfield/index.html';
const PRELOAD_PATH = 'dist/main/preload.js';

const MIN_WINDOW_WIDTH = 960;
const MIN_WINDOW_HEIGHT = 640;

export class WindowService {
  private static instance: WindowService;
  private store: StoreService | null = null;
  private window: BrowserWindow | null = null;

  constructor() {}

  public static getInstance(): WindowService {
    if (!WindowService.instance) WindowService.instance = new WindowService();
    return WindowService.instance;
  }

  public start() {
    console.log('Starting window service...');
    this.store = StoreService.getInstance();
    this.openWindow();
    this.handleWindowIpcEvents();
  }

  public broadcastMessage(channel: string, value: any) {
    this.window?.webContents.send(channel, value);
  }

  private openWindow() {
    if (this.window !== null) return;
    const bounds = this.store.getWindowSize('window');
    const position = this.store.getWindowPosition('window');
    this.window = new BrowserWindow({
      width: bounds[0],
      height: bounds[1],
      minWidth: MIN_WINDOW_WIDTH,
      minHeight: MIN_WINDOW_HEIGHT,
      x: position[0],
      y: position[1],
      backgroundColor: '#333333',
      icon: join(app.getAppPath(), ICON_PATH),
      frame: false,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(app.getAppPath(), PRELOAD_PATH),
      },
    });
    this.window.loadFile(join(app.getAppPath(), WINDOW_PATH));
    this.handleWindowEvents();
  }

  private showWindow() {
    this.window.show();
  }

  private minimizeWindow() {
    BrowserWindow.getFocusedWindow().minimize();
  }

  private maximizeWindow() {
    BrowserWindow.getFocusedWindow().maximize();
    BrowserWindow.getFocusedWindow().setFullScreen(true);
  }

  private unmaximizeWindow() {
    BrowserWindow.getFocusedWindow().setFullScreen(false);
    BrowserWindow.getFocusedWindow().unmaximize();
  }

  private closeWindow() {
    BrowserWindow.getFocusedWindow().close();
  }

  private toggleDevTools() {
    BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
  }

  
  private handleWindowEvents() {
    this.window.on('ready-to-show', () => {
      this.showWindow();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
    this.window.on('maximize', () => {
      this.window.webContents.send('window:maximize');
    });
    this.window.on('unmaximize', () => {
      this.window.webContents.send('window:unmaximize');
    });
    this.window.on('resized', () => {
      this.store?.setWindowSize('window', this.window?.getSize());
    });
    this.window.on('moved', () => {
      this.store?.setWindowPosition('window', this.window?.getPosition());
    });
  }

  private handleWindowIpcEvents() {
    ipcMain.on('window:minimize', () => this.minimizeWindow());
    ipcMain.on('window:maximize', () => this.maximizeWindow());
    ipcMain.on('window:unmaximize', () => this.unmaximizeWindow());
    ipcMain.on('window:close', () => this.closeWindow());
    ipcMain.on('window:toggle-dev-tools', () => this.toggleDevTools());
  }
}
