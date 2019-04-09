module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    'mockedData'
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**'
  ],
  snapshotSerializers: [],
  coverageDirectory: 'reports/coverage',
  setupFiles: [],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  testEnvironment: 'node',
  bail: false,
  forceExit: false,
  verbose: true,
  testURL: 'http://localhost/',
  preset: 'ts-jest',
  testMatch: null
}
