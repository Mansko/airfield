import { app, ipcMain, screen, nativeTheme, powerMonitor } from 'electron';
import { WindowService } from './window.service';

export class SystemService {
  private static instance: SystemService;
  private monitorSize: Electron.Size | null = null;
  private shouldUseDarkColors: boolean | null = null;
  private themeSource: 'system' | 'dark' | 'light' | null = null;
  private isOnBatteryPower: boolean | null = null;
  private systemLocale: string | null = null;
  private locale: string | null = null;
  private preferredSystemLanguage: string[] | null = null;
  private chromeVersion: string | null = null;
  private electronVersion: string | null = null;
  private nodeVersion: string | null = null;
  private platform: string | null = null;
  private window: WindowService | null = null;

  private constructor() {
    this.window = WindowService.getInstance();
  }

  public static getInstance(): SystemService {
    if (!SystemService.instance) SystemService.instance = new SystemService();
    return SystemService.instance;
  }

  public start() {
    console.log('Starting system service...');
    this.initialize();
    this.handleNativeThemeEvents();
    this.handlePowerMonitorEvents();
    this.handleScreenEvents();
    this.handleSystemIpcEvents();
  }

  private initialize() {
    this.shouldUseDarkColors = nativeTheme.shouldUseDarkColors;
    this.themeSource = nativeTheme.themeSource;
    this.monitorSize = screen.getPrimaryDisplay().workAreaSize;
    this.isOnBatteryPower = powerMonitor.isOnBatteryPower();
    this.systemLocale = app.getSystemLocale();
    this.locale = app.getLocale();
    this.preferredSystemLanguage = app.getPreferredSystemLanguages();
    this.chromeVersion = process.versions.chrome;
    this.electronVersion = process.versions.electron;
    this.nodeVersion = process.versions.node;
    this.platform = process.platform;

    console.log('Should use dark colors:', this.shouldUseDarkColors);
    console.log('Should use theme source:', this.themeSource);
    console.log('System is on battery power:', this.isOnBatteryPower);
    console.log('System locale:', this.systemLocale);
    console.log('Locale:', this.locale);
    console.log('Preferred system language:', this.preferredSystemLanguage);
    console.log('Version of Chrome:', this.chromeVersion);
    console.log('Version of Electron:', this.electronVersion);
    console.log('Version of Node:', this.nodeVersion);
    console.log('Platform::', this.platform);
  }

  private handleNativeThemeEvents() {
    nativeTheme.on('updated', () => {
      if (this.shouldUseDarkColors !== nativeTheme.shouldUseDarkColors) {
        this.shouldUseDarkColors = nativeTheme.shouldUseDarkColors;
        this.window.broadcastMessage(
          'system:shouldUseDarkColors',
          this.shouldUseDarkColors
        );
        console.log('Should use dark colors:', this.shouldUseDarkColors);
      }
      if (this.themeSource !== nativeTheme.themeSource) {
        this.themeSource = nativeTheme.themeSource;
        this.window.broadcastMessage('system:themeSource', this.themeSource);
        console.log('Should use theme source:', this.themeSource);
      }
    });
  }

  private handlePowerMonitorEvents() {
    powerMonitor.on('on-battery', () => {
      this.isOnBatteryPower = true;
      this.window.broadcastMessage('system:isOnBatteryPower', true);
      console.log('System is on battery power:', this.isOnBatteryPower);
    });
    powerMonitor.on('on-ac', () => {
      this.isOnBatteryPower = false;
      this.window.broadcastMessage('system:isOnBatteryPower', false);
      console.log('System is on battery power:', this.isOnBatteryPower);
    });
  }

  private handleScreenEvents() {
    screen.on('display-metrics-changed', () => {
      this.monitorSize = screen.getPrimaryDisplay().workAreaSize;
      this.window.broadcastMessage('system:monitorSize', this.monitorSize);
      console.log('Monitor size:', this.monitorSize);
    });
  }

  private handleSystemIpcEvents() {
    ipcMain.handle('system:monitorSize', () => {
      return this.monitorSize;
    });
    ipcMain.handle('system:shouldUseDarkColors', () => {
      return this.shouldUseDarkColors;
    });
    ipcMain.handle('system:themeSource', () => {
      return this.themeSource;
    });
    ipcMain.handle('system:isOnBatteryPower', () => {
      return this.isOnBatteryPower;
    });
    ipcMain.handle('system:systemLocale', () => {
      return this.systemLocale;
    });
    ipcMain.handle('system:locale', () => {
      return this.locale;
    });
    ipcMain.handle('system:preferredSystemLanguage', () => {
      return this.preferredSystemLanguage;
    });
    ipcMain.handle('system:chromeVersion', () => {
      return this.chromeVersion;
    });
    ipcMain.handle('system:electronVersion', () => {
      return this.electronVersion;
    });
    ipcMain.handle('system:nodeVersion', () => {
      return this.nodeVersion;
    });
    ipcMain.handle('system:platform', () => {
      return this.platform;
    });
  }
}
