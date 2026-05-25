import path from 'node:path';
import { Config } from '@remotion/cli/config';

Config.setEntryPoint('./src/video/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

Config.overrideWebpackConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...(config.resolve?.alias as Record<string, string>),
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
}));
