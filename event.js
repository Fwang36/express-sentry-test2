export default [
    {
      filename: 'app:///layer.js',
      module: 'express.lib.router:layer',
      function: 'Layer.handle [as handle_request]',
      lineno: 95,
      colno: 5,
      in_app: false,
      pre_context: [
        '',
        '  if (fn.length > 3) {',
        '    // not a standard request handler',
        '    return next();',
        '  }',
        '',
        '  try {'
      ],
      context_line: '    fn(req, res, next);',
      post_context: [
        '  } catch (err) {',
        '    next(err);',
        '  }',
        '};',
        '',
        '/**',
        ' * Check if this route matches `path`, if so'
      ]
    },
    {
      filename: 'app:///handlers.js',
      module: '@sentry.node.cjs:handlers',
      function: 'sentryTracingMiddleware',
      lineno: 58,
      colno: 5,
      in_app: false,
      pre_context: [
        '      setImmediate(() => {',
        '        utils.addRequestDataToTransaction(transaction, req);',
        '        transaction.setHttpStatus(res.statusCode);',
        '        transaction.finish();',
        '      });',
        '    });',
        ''
      ],
      context_line: '    next();',
      post_context: [
        '  };',
        '}',
        '',
        '/**',
        ' * Express compatible request handler.',
        ' * @see Exposed as `Handlers.requestHandler`',
        ' */'
      ]
    },
    {
      filename: 'app:///index.js',
      module: 'express.lib.router:index',
      function: 'next',
      lineno: 280,
      colno: 10,
      in_app: false,
      pre_context: [
        '    // Capture one-time layer values',
        '    req.params = self.mergeParams',
        '      ? mergeParams(layer.params, parentParams)',
        '      : layer.params;',
        '    var layerPath = layer.path;',
        '',
        '    // this should be done for the layer'
      ],
      context_line: '    self.process_params(layer, paramcalled, req, res, function (err) {',
      post_context: [
        '      if (err) {',
        '        next(layerError || err)',
        '      } else if (route) {',
        '        layer.handle_request(req, res, next)',
        '      } else {',
        '        trim_prefix(layer, layerError, layerPath, path)',
        '      }'
      ]
    },
    {
      filename: 'app:///index.js',
      module: 'express.lib.router:index',
      function: 'Function.process_params',
      lineno: 346,
      colno: 12,
      in_app: false,
      pre_context: [
        '  var params = this.params;',
        '',
        '  // captured parameters from the layer, keys and values',
        '  var keys = layer.keys;',
        '',
        '  // fast track',
        '  if (!keys || keys.length === 0) {'
      ],
      context_line: '    return done();',
      post_context: [
        '  }',
        '',
        '  var i = 0;',
        '  var name;',
        '  var paramIndex = 0;',
        '  var key;',
        '  var paramVal;'
      ]
    },
    {
      filename: 'app:///index.js',
      module: 'express.lib.router:index',
      function: '<anonymous>',
      lineno: 284,
      colno: 15,
      in_app: false,
      pre_context: [
        '    var layerPath = layer.path;',
        '',
        '    // this should be done for the layer',
        '    self.process_params(layer, paramcalled, req, res, function (err) {',
        '      if (err) {',
        '        next(layerError || err)',
        '      } else if (route) {'
      ],
      context_line: '        layer.handle_request(req, res, next)',
      post_context: [
        '      } else {',
        '        trim_prefix(layer, layerError, layerPath, path)',
        '      }',
        '',
        '      sync = 0',
        '    });',
        '  }'
      ]
    },
    {
      filename: 'app:///layer.js',
      module: 'express.lib.router:layer',
      function: 'Layer.handle [as handle_request]',
      lineno: 95,
      colno: 5,
      in_app: false,
      pre_context: [
        '',
        '  if (fn.length > 3) {',
        '    // not a standard request handler',
        '    return next();',
        '  }',
        '',
        '  try {'
      ],
      context_line: '    fn(req, res, next);',
      post_context: [
        '  } catch (err) {',
        '    next(err);',
        '  }',
        '};',
        '',
        '/**',
        ' * Check if this route matches `path`, if so'
      ]
    },
    {
      filename: 'app:///route.js',
      module: 'express.lib.router:route',
      function: 'Route.dispatch',
      lineno: 114,
      colno: 3,
      in_app: false,
      pre_context: [
        '  var method = req.method.toLowerCase();',
        "  if (method === 'head' && !this.methods['head']) {",
        "    method = 'get';",
        '  }',
        '',
        '  req.route = this;',
        ''
      ],
      context_line: '  next();',
      post_context: [
        '',
        '  function next(err) {',
        '    // signal to exit route',
        "    if (err && err === 'route') {",
        '      return done();',
        '    }',
        ''
      ]
    },
    {
      filename: 'app:///route.js',
      module: 'express.lib.router:route',
      function: 'next',
      lineno: 144,
      colno: 13,
      in_app: false,
      pre_context: [
        '    }',
        '',
        '    if (layer.method && layer.method !== method) {',
        '      next(err)',
        '    } else if (err) {',
        '      layer.handle_error(err, req, res, next);',
        '    } else {'
      ],
      context_line: '      layer.handle_request(req, res, next);',
      post_context: [ '    }', '', '    sync = 0', '  }', '};', '', '/**' ]
    },
    {
      filename: 'app:///layer.js',
      module: 'express.lib.router:layer',
      function: 'Layer.handle [as handle_request]',
      lineno: 95,
      colno: 5,
      in_app: false,
      pre_context: [
        '',
        '  if (fn.length > 3) {',
        '    // not a standard request handler',
        '    return next();',
        '  }',
        '',
        '  try {'
      ],
      context_line: '    fn(req, res, next);',
      post_context: [
        '  } catch (err) {',
        '    next(err);',
        '  }',
        '};',
        '',
        '/**',
        ' * Check if this route matches `path`, if so'
      ]
    },
    {
      filename: 'app:///index.js',
      module: 'index',
      function: '<anonymous>',
      lineno: 122,
      colno: 11,
      in_app: true,
      pre_context: [
        "app.get('/e4', (req, res) => {",
        '',
        '    throw new Error("error2.com")',
        '})',
        '',
        'app.get("/e3", (req, res) => {',
        '    const test = "test"'
      ],
      context_line: '    throw new Error("error.com")',
      post_context: [
        '})',
        "app.get('/testing', function mainHandler(req, res) {",
        '',
        `    // console.log("getHub", Sentry.getCurrentHub().getScope()._tags['server-name'])`,
        '    //     // scope.setTag("page_locale", "de-at");',
        '',
        '    // Sentry.configureScope(scope => {'
      ]
    }
  ]  

