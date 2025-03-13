
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7365d7de31b046feb07f1d4b90f13ce5',
  appName: 'app-cycler-magic',
  webDir: 'dist',
  server: {
    url: 'https://7365d7de-31b0-46fe-b07f-1d4b90f13ce5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'appcycler.keystore',
      keystoreAlias: 'appcycler',
    },
    // Adding orientation preference
    preferences: {
      orientation: 'landscape'
    }
  }
};

export default config;
