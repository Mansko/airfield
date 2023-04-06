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
      openProjectSpace: () => void;
      closeProjectSpace: () => void;
      showProjectSpace: () => void;

      openEditor: () => void;
      closeEditor: () => void;
      showEditor: () => void;

      onMinimize: (cb: () => void) => void;
      onMaximize: (cb: () => void) => void;

      toggleDevTools: () => void;

      minimize: () => void;
      maximize: () => void;
      restore: () => void;
      close: () => void;
    };
    auth: {
      startSigninProcess: () => void;
      getCredentials: () => Promise<string>;
      onSignin: (cb: (event: any, ...args: any) => Promise<void>) => void;
      signout: () => void;
      onSignout: (cb: (event: any, ...args: any) => Promise<void>) => void;
    };
    opcua: {
      connect: (ip: string, port: string) => Promise<boolean>;
      disconnect: () => Promise<boolean>;
      isConnected: () => Promise<boolean>;
      read: (nodeId: string) => Promise<any>;
      write: (nodeId: string, value: any) => Promise<boolean>;
      subscribe: (uid: string, nodeId: string) => Promise<void>;
      unsubscribe: (uid: string) => Promise<void>;
      on: (event: string, cb: (value: any) => void) => Promise<void>;
      onValueChange: (id: string, cb: (value: any) => void) => Promise<void>;
      removeAllListeners: (event: string) => Promise<void>;
      updateProgramm: (programm: any) => Promise<boolean>;
    };
  }
}
