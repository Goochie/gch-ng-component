
module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      //DEPENDENCIES
      'lib/jquery/dist/jquery.min.js',
      '../demo/client/src/bower_components/angular/angular.js',
      'lib/angular-mocks/angular-mocks.js',

      //SOURCE FILES
      '../src/scripts/*.js',
      //TEST FILES
      'unit/**/*.js'
    ],

    exclude: [],
    port: 8090,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  });
};
