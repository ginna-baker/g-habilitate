var test = require('tape');

test('package test', function (t) {
    t.plan(3);

    var hardwareResolve = require('../');

    t.deepEqual(hardwareResolve.list(__dirname + '/a'),
{ 'package.json': 'package.json',
  'src/index.js': 'hardware-src/index.js',
  'node_modules/async/LICENSE': 'node_modules/async/LICENSE',
  'node_modules/async/README.md': 'node_modules/async/README.md',
  'node_modules/async/component.json': 'node_modules/async/component.json',
  'node_modules/async/package.json': 'node_modules/async/package.json',
  'node_modules/async/lib/async.js': 'node_modules/async/lib/async.js' }, 'Invalid hardware resolve list');


    t.deepEqual(hardwareResolve.list(__dirname + '/b'),
{ 'index.js': 'index.js',
  'node_modules/async/LICENSE': 'node_modules/async/LICENSE',
  'node_modules/async/README.md': 'node_modules/async/README.md',
  'node_modules/async/component.json': 'node_modules/async/component.json',
  'node_modules/async/package.json': 'node_modules/async/package.json',
  'node_modules/async/lib/async.js': 'node_modules/async/lib/async.js' });

    hardwareResolve.root(__dirname + '/b/index.js', function (err, pushdir, relpath) {
      t.ok(relpath == 'index.js', 'node_modules should trigger resolution');
    })
});