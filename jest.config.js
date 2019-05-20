module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'src/index.js',
    'src/app.js',
    'src/helpers/logger.js',
    'src/models/index.js',
    'src/middlewares/joiErrors.js',
  ],
  verbose: true,
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
