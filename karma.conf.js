module.exports = function(config) {
  config.set({
    singleRun: true,
    frameworks: ['mocha', 'requirejs'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'lib/*.js': 'coverage',
      'lib/browser/*.js': 'coverage',
      'test/browser/main.js': 'requirejs'
    },
    coverageReporter: {
      subdir: 'browser',
      reporters: [
        {
          type: 'json'
        },
        {
          type: 'html'
        }
      ]
    },
    requirejsPreprocessor: {
      config: {
        baseUrl: '/base',
        paths: {
          text: 'node_modules/requirejs-plugins/lib/text'
        }
      },
      testRegexp: '^/base/test/(?!nodejs/).+\.spec\.js$'
    },
    files: [
      'test/browser/main.js',
      {
        pattern: 'test/**/*.js',
        included: false
      },
      {
        pattern: 'lib/**/*.js',
        included: false
      },
      {
        pattern: 'node_modules/**/*.js',
        included: false
      }
    ]
  });
};
