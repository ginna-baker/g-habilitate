var assert = require('assert');

console.log('1..1');

var effess = require('../')

var match = effess.readdirRecursiveSync(__dirname + '/a');
assert.deepEqual(match, ['cool.js',
  'b/c/d.js']);

var match = effess.readdirRecursiveSync(__dirname + '/a', { fullPath: true });
assert.deepEqual(match, [__dirname + '/a/cool.js',
  __dirname + '/a/b/c/d.js']);

console.log('ok');

assert.deepEqual(effess.readdirRecursiveSync(__dirname + '/b', { fullPath: false, inflateSymlinks: true }),
	[ 'hello/c/index.js' ]);