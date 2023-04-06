export {};
declare global {
  interface Window {
    require: (id: string) => any;
    system: {
      shouldUseDarkColors: () => Promise<boolean>;
      onShouldUseDarkColorsUpdate: (
        cb: (event: any, ...args: any) => void
      ) => void;
      getNodeVersion: () => Promise<string>;
      getChromeVersion: () => Promise<string>;
      getElectronVersion: () => Promise<string>;
    };
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
