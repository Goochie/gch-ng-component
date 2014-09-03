gch-ng-component
================

Standardising angularJS component creation Standards and workflow for developing re usable angularJS components in isolation using TDD and deploying to the bower repository.

Intro 


Through the creation of many angularJS components and subsequently getting more familiar with the Directive architecture. I find myself not only repeating practices but also copy and pasting boilerplate templates to define my component project setups.

This post is the first draft in subjectively standardising angularJS component creation from my experiance through best practise and defining the workflow involved in the creation of an angularJS component that is deployed to bower. 

All of which has been documented and where appropriate automated process’s have been defined and implemented through a yeoman project and appropriate grunt tasks.

Requirements 


Defined project structure for testing, development, demo and distribution.
Unit and e2e testing of a directive
Directive implementation best practise
Automated workflow through task management
Bower deployment

Project structure 


When creating and deploying a re usable component using angularJS it is good practice to have the following project structure.

component/
  /dist
 /demo
 /src
 /test

 /dist — This directory holds the distributed files, minifed source, css, fonts etc

 /demo— When a developing a component for public consumption it is always good to provide a demo of your component in action

 /src— The source of the component 

 /test — Contains unit tests and e2e testing







Testing 


As we are using angular the testing will be conducted by using jasmine, karma and protractor.

Dependencies 


The key dependency here is one that is managed out side of the context of the angular component and it is the installation of selenium and webdriver. 

The installation of webdriver is best achieved by go through the official getting started guide for protractor. 

Unit testing a directive 


As testing is a subjective matter the following is some simple guides to cover the specific edge case of testing directives and how to gain reference to a directives scope, isolated scope, HTML element and directive controllers.

Setting up our tests

describe(‘My new directive :: ‘, function(){

      var elem, scope,ctrl,isoScope ;

      beforeEach(module(‘myDirectivesModule’));

      beforeEach(inject(function($rootScope, $compile) {

               elem = angular.element(‘<my-directive>  
                                        </my-directive>’);

               scope = $rootScope.$new();
               $compile(elem)(scope);
               scope.$digest();

               ctrl     = elem.controller(“myDirective”);
               isoScope = elem.isolateScope();
 }));

})

The following variables have been declared inside the describe closure so that they can be shared throughout the tests.

var elem, scope,ctrl,isoScope ;

These varibles are also key to holding reference to the directive.

elem = HTML element that represents the directive
scope = scope of the directive
ctrl = controller of the directive
isoScope = isolated scope of the directive

Compiling the directive

Before we run any of our tests we need to compile our directive and add it to the angular context.

The following line wraps the directive template as a jQuery elemement or to be specific a jQuery lite element.

 elem = angular.element(‘<my-directive></my-directive>’);

We now need to add a scope object to our directive then compile them together.

The following code achieves this by using the $new to create a new scope object on rootscope and using the $compile service to put the two together.

 scope = $rootScope.$new();
 $compile(elem)(scope);

At this point we have our directive template and scope compiled together we just need to add the directive to the angular context.

This is achieved by forcing a digest cycle using the following code.

scope.$digest();

At this point our directive is loaded into the angular context and will have access to the angular life cycle.

Therefore its now time to grab a refrence to our directives isolated scope (if you have one) and its controller as we already have a reference to the scope and directive template.

The controller and isolated scope are accessible through the element property that we had previously defined.

ctrl     = elem.controller(“myDirective”);
isoScope = elem.isolateScope();

Summary

A beforeEach() method has been used to compile our directive and to initialise hooks into the key parts of a directive that will need testing.

This means that you will be able to access and test your compiled directive.

e2e testing a directive 


End to end or integration testing a directive is very much the same process as undertaking e2e testing on any other part of your application.

Therefore to get up to speed with this type of testing go through the getting started guide here.







Work Flow 


TDD development 


I like to develop using a very pragmatic TDD approach, which entails writing my tests first then implementing the functionality to make them pass.

Pragmatism comes in play with respect to how much logic i decide to test. 




Setting up a TDD envoironment using grunt and angular is a very simple process. 

karma.conf

module.exports = function(config) {

  config.set({
       basePath: ‘’,
       frameworks: [‘jasmine’],
       files: [

          //Testing dependencies
          ‘lib/jquery/dist/jquery.min.js’,
          ‘../bower_components/angular/angular.js’,
          ‘lib/angular-mocks/angular-mocks.js’,
          ‘lib/angular-socket.io-mock/angular-socket.io-mock.js’,

          //Source
          ‘../src/scripts/*.js’,

          //Tests
          ‘unit/**/*.js’
   ],
   exclude: [],
   port: 8090,
   logLevel: config.LOG_INFO,
   browsers: [‘Chrome’],
   autoWatch: true,
   singleRun: false
});
};

Once you have jasmine and protractor configured in grunt you simply have to set the following configuration properties in your karma.conf.

 autoWatch: true,
 singleRun: false

Deploy to demo 


In order to deploy to the demo folder we simply set up a grunt task to copy our files over.

 /* Deploy to demo…
 */

grunt.registerTask(‘deployDemo’, [‘copy’]);




 //————————————————
 // DEPLOY DEMO
 //————————————————

 copy: {
    dev: {
        files: [

           // Copy — Directive
           { expand: true, flatten: true, src:   [‘src/scripts/**’], 
             dest: ‘demo/client/src/app/directive/’,filter:                               
            ‘isFile’},

           // Copy — Styles
           { expand: true, flatten: true, src: [‘src/styles/**’],
             dest: ‘demo/client/src/styles/’,filter: ‘isFile’}]
           }
       },

Deploy to distribution
