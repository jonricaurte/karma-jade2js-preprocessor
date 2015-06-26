# karma-jade2js-preprocessor

> Preprocessor for converting jade files to Javascript.

Forked from [karma-ng-jade2js-preprocessor](https://github.com/chmanie/karma-ng-jade2js-preprocessor)

## Installation

The easiest way is to keep `karma-jade2js-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.12",
    "karma-jade2js-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-jade2js-preprocessor --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.jade': ['jade2js']
    },

    files: [
      '*.js',
      '*.jade',
      // if you wanna load template files in nested directories, you must use this
      '**/*.jade'
    ],

    jade2JsPreprocessor: {
      // Support for jade locals to render at compile time
      locals: {
        foo: 'bar'
      },
      
      // Jade compiler options. For a list of possible options, consult Jade documentation.
      jadeOptions: {
        doctype: 'xml'
      }
    }
  });
};
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
