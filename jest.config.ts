import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: ['node_modules/word-list-json'],
  testMatch: ['**/?(*.)+(jest).ts'],
  //moduleNameMapper: { 'word-list-json': '<rootDir>/__mocks__/words.ts' },
};

export default jestConfig;
