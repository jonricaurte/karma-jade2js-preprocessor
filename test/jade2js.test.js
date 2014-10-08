var assert = require('assert');
var util = require('util');
var jade2js = require('../lib/jade2js');
var loggerStub = { create: function(){ return { debug: function() {} } } };
var basePathStub = 'foo';
var fileStub = { originalPath: '/tmp/original/path', path: '/tmp/new/path' }
var testConfig = { locals: { message: 'Hello world' } };
var compileFn = jade2js(loggerStub, basePathStub, testConfig);
var successes = 0;
var expected = 2;

compileFn('h1 This is a bland message', fileStub, function(result) {
  assert.ok(result, 'it returns a proper message');
  successes += 1;
});
compileFn('h1= message', fileStub, function(result) {
  assert.ok(/hello world/i.test(result), 'it contains the locals');
  successes += 1;
});


var checkComplete = function() {
  if (successes == expected)
    console.log('all tests pass!');
  else
    process.nextTick(checkComplete);
}
process.nextTick(checkComplete);

