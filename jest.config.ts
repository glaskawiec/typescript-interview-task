import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
