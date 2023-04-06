import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('system', {
  shouldUseDarkColors: () => ipcRenderer.invoke('system:shouldUseDarkColors'),
  onShouldUseDarkColorsUpdate: (cb: () => void) =>
    ipcRenderer.on('system:shouldUseDarkColors', cb),

  getLocale: () => ipcRenderer.invoke('system:locale'),
  getPreferredSystemLanguage: () =>
    ipcRenderer.invoke('system:preferredSystemLanguage'),
  getNodeVersion: () => process.versions.node,
  getChromeVersion: () => process.versions.chrome,
  getElectronVersion: () => process.versions.electron,
  getPlatform: () => process.platform,
});

contextBridge.exposeInMainWorld('common', {
  minimize: () => ipcRenderer.send('window:minimize'),
  onMinimize: (cb: () => void) => ipcRenderer.on('window:unmaximize', cb),
  maximize: () => ipcRenderer.send('window:maximize'),
  onMaximize: (cb: () => void) => ipcRenderer.on('window:maximize', cb),
  restore: () => ipcRenderer.send('window:unmaximize'),
  close: () => ipcRenderer.send('window:close'),
  toggleDevTools: () => ipcRenderer.send('window:toggle-dev-tools'),
});

