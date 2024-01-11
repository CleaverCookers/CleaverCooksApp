import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.CleaverCook.app',
  appName: 'CleaverCooks',
  webDir: 'dist/cleaver-cooks-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
