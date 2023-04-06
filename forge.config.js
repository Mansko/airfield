module.exports = {
  packagerConfig: {
    name: 'Airfield',
    executableName: 'airfield',
    icon: './assets/icons/icon-512x512',
    prune: true,
    asar: true,
    overwrite: true,
    ignore: [
      '^/[.]angular$',
      '^/[.]firebase$',
      '^/[.]vscode$',
      '^/main$',
      '^/projects$',
      '^/libs$',
      '^/assets$',
      '^/env$',
      '^/coverage$',
      '^/[.]browserslistrc$',
      '^/[.]editorconfig$',
      '^/[.]eslintrc[.]json$',
      '^/[.]firebaserc$',
      '^/[.]gitignore$',
      '^/[.]gitlab[-]ci[.]yml$',
      '^/[.]prettierignore$',
      '^/[.]prettierrc[.]json$',
      '^/angular[.]json$',
      '^/firebase[.]json$',
      '^/forge[.]config[.]js$',
      '^/README[.]md$',
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        mimeType: ['x-scheme-handler/airfield'],
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
