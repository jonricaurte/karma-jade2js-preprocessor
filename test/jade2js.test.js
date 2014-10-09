var expect = require('expect.js');
var jade2js = require('../lib/jade2js');
var LOGGER_STUB = { create: function(){ return { debug: function() {} } } };
var BAST_PATH_STUB = 'foo';
var FILE_STUB = { originalPath: '/tmp/original/path', path: '/tmp/new/path' }
var TEST_CONFIG = { locals: { message: 'Hello world' } };

describe('jade2js', function() {
  describe('default behavior [no config]', function() {
    var compileFn = jade2js(LOGGER_STUB, BAST_PATH_STUB);
    var html;
    before(function(done) {
      var JADE_SNIPPET = 'h1 This is a bland message'
      compileFn(JADE_SNIPPET, FILE_STUB, function(result) {
        html = result;
        done();
      });
    });
    it('should succeed', function() {
      expect(html).to.be.ok();
    });
  });
  describe('config object', function() {
    var compileFn = jade2js(LOGGER_STUB, BAST_PATH_STUB, TEST_CONFIG);
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
});

