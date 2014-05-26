/**
 * Handlebars Helpers for Pattern Lab
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

var path = require('path');
var file = require('fs-utils');
var _ = require('lodash');


module.exports.register = function (Handlebars, options, params) {
  options = options || {};
  var config = _.extend(options, options.data || {});

  var numPattern = /^\d+-/;

  var patterns = ['atom', 'molecule', 'organism', 'template'];

  patterns.forEach(function(pattern) {
    var inflection = pattern + 's';

    file.expand(options.patterns[inflection]).forEach(function(filepath) {
      var name = file.base(filepath);

      // Strip out number prefix
      name = name.replace(numPattern, '');

      var partialName = pattern + '-' + name;
      var template = file.readFileSync(filepath);
      Handlebars.registerPartial(partialName, template);
    });

    Handlebars.registerHelper(pattern, function(name, context) {
      context = _.extend(config, this, context || {});

      // Strip out number prefix
      name = name.replace(numPattern, '');

      var template = Handlebars.partials[pattern + '-' + name];
      var fn = Handlebars.compile(template);
      return new Handlebars.SafeString(fn(context));
    });
  });
};
