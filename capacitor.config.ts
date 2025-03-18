
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7365d7de31b046feb07f1d4b90f13ce5',
  appName: 'app-cycler-magic',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: 'appcycler.keystore',
      keystoreAlias: 'appcycler',
    },
    preferences: {
      orientation: 'landscape'
    }
  }
};

export default config;
