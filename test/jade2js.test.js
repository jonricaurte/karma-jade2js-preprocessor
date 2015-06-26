var expect = require('expect.js');
var jade2js = require('../lib/jade2js');
var LOGGER_STUB = {
  create: function () {
    return {
      debug: function () {}
    };
  }
};
var BAST_PATH_STUB = 'foo';
var FILE_STUB = {
  originalPath: '/tmp/original/path.jade',
  path: '/tmp/new/path'
};

describe('jade2js', function() {

  describe('default behavior (no config)', function() {
    var compileFn = jade2js(LOGGER_STUB, BAST_PATH_STUB);
    var html;

    before(function(done) {
      var JADE_SNIPPET = 'h1 This is a bland message';
      compileFn(JADE_SNIPPET, FILE_STUB, function(result) {
        html = result;
        done();
      });
    });

  });

  describe('jade locals', function() {

    var LOCALS_CONFIG = {
      locals: {
        message: 'Hello world'
      }
    };

    var compileFn = jade2js(LOGGER_STUB, BAST_PATH_STUB, LOCALS_CONFIG);
    var html;

    before(function(done) {
      var JADE_SNIPPET = 'h1= message';
      compileFn(JADE_SNIPPET, FILE_STUB, function(result) {
        html = result;
        done();
      });
    });

    it('should contain the `locals` data', function() {
      expect(html).to.contain('Hello world');
    });

  });

  describe('extension transform function', function() {

    var TRANSFORM_FILE_STUB = {
      originalPath: '/tmp/original/path.jst.jade',
      path: '/tmp/new/path'
    };

    var compileFn = jade2js(LOGGER_STUB, BAST_PATH_STUB);
    var html;

    before(function(done) {
      var JADE_SNIPPET = 'h1 Hello World';
      compileFn(JADE_SNIPPET, TRANSFORM_FILE_STUB, function(result) {
        html = result;
        done();
      });
    });

  });

  describe('Jade config object', function() {
    var jade = require('jade');
    var originalCompile;
    var callOptions;

    before(function() {
      originalCompile = jade.compile;
      jade.compile = function(template, options) {
        callOptions = options;
        return function() { return ''; };
      };
    });

    after(function() {
      jade.compile = originalCompile;
      callOptions = null;
    });

    it('should pass Jade config object to Jade compile function', function(done) {
      var config = {
        jadeOptions: {
          a: 1,
          b: 2
        }
      };
      var compileFn = jade2js(LOGGER_STUB, BAST_PATH_STUB, config);
      compileFn('h1', FILE_STUB, function() {
        expect(callOptions).to.eql(config.jadeOptions);
        done();
      });
    });
  });
});

