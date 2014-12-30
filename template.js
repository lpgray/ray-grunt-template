/*
 * ray-grunt-template copied from grunt-init-commonjs
 * http://www.h5shop.org/
 * 
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors and Ray
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a webapp structure based on ray-grunt-template.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email')
  ], function(err, props) {
    props.devDependencies = {
      "grunt": "~0.4.2",
      "grunt-browser-sync": "^1.5.3",
      "grunt-contrib-watch": "~0.5.3",
      "grunt-contrib-connect": "~0.6.0",
      "connect-livereload": "~0.3.2",
      "grunt-contrib-uglify": "~0.3.2",
      "grunt-contrib-cssmin": "~0.8.0",
      "grunt-contrib-jshint": "~0.8.0",
      "grunt-contrib-copy": "~0.7.0",
      "grunt-contrib-concat": "~0.5.0",
      "grunt-processhtml": "~0.3.3",
      "grunt-contrib-less": "~0.11.4",
      "grunt-contrib-clean": "~0.6.0",
      "grunt-contrib-imagemin" : "~0.9.2",
      "grunt-includes": "~0.4.5"
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
