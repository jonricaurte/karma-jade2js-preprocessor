var util = require('util');
var jade = require('jade');

var TEMPLATE = '' +
    'window.__html__ = window.__html__ || {};\n' +
    'window.__html__[\'%s\'] = \'%s\'';

var escapeContent = function(content) {
  return content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};

var createJade2JsPreprocessor = function(logger, basePath, config) {
  config = typeof config === 'object' ? config : {};

  var log = logger.create('preprocessor.jade2js');
  var locals = config.locals;

  var jadeOptions = config.jadeOptions || {
          client: true,
          pretty: true
      };

  return function(content, file, done) {
    var processed;

    log.debug('Processing "%s".', file.originalPath);

    jadeOptions.filename = file.originalPath;

    try {
       processed = jade.compile(content, jadeOptions);
    } catch (e) {
     log.error('%s\n  at %s', e.message, file.originalPath);
    }

    content = processed(locals);

    var htmlPath = file.originalPath.replace(basePath + '/', '');

    file.path = file.path.replace(/\.jade$/, '.html') + '.js';

    done(util.format(TEMPLATE, htmlPath, escapeContent(content)));
  };
};

createJade2JsPreprocessor.$inject = ['logger', 'config.basePath', 'config.jade2JsPreprocessor'];

module.exports = createJade2JsPreprocessor;
