// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

// ref: https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@machine/(.*)$': '<rootDir>/src/machine/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
};

module.exports = createJestConfig(customJestConfig);
