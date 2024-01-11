import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.CleaverCook.app',
  appName: 'CleaverCooksApp',
  webDir: 'dist/cleaver-cooks',
  server: {
    androidScheme: 'https'
  }
};

export default config;
