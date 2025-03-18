
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.appcyclermagic',
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
