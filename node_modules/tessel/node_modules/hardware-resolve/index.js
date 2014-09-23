// var wrench = require('./wrench');

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var minimatch = require("minimatch")
var osenv = require('osenv')
var effess = require('effess')

function isObject (a) {
  return typeof a == 'object';
}

function isGlob (glob) {
  return new minimatch.Minimatch(glob).set.some(function (arr) {
    return arr.some(isObject);
  });
}

function warn (err) {
  // console.error.apply(console, ['WARN'].concat([].slice.call(arguments)));
}

function list (dir, filesOut, modulesOut, defaults)
{
  filesOut = filesOut || {};
  modulesOut = modulesOut || {};

  var pkgpath = (dir[0] == '/' || dir[0] == '.' ? '' : './') + path.join(dir, 'package.json');
  try {
    var pkg = require(pkgpath, 'utf-8');
    var hasPkg = true;
  } catch (e) {
    var pkg = {};
    var hasPkg = false;

    if (fs.existsSync(pkgpath)) {
      warn('Invalid package.json:', pkgpath);
    }
  }

  // Patterns and replacements.
  var
    moduleGlob = [], modules = {},
    pathGlob = [], paths = {};

  var propagate = {};

  function update (hash) {
    Object.keys(hash).forEach(function (key) {
      if (key.match(/:/)) {
        if (!propagate[key.replace(/:.*$/, '')]) {
          propagate[key.replace(/:.*$/, '')] = {};
        }
        propagate[key.replace(/:.*$/, '')][key.replace(/^.*?:/, '')] = hash[key];
        return;
      }

      if (key[0] != '/' && key[0] != '.') {
        if (isGlob(key)) {
          moduleGlob.push([new minimatch.Minimatch(key), hash[key]]);
        } else {
          modules[key] = hash[key];
        }
      } else {
        if (isGlob(key)) {
          pathGlob.push([new minimatch.Minimatch(key.substr(2)), hash[key]])
        } else {
          try {
            if (typeof hash[key] != 'string' && fs.lstatSync(path.join(dir, key)).isDirectory()) {
              pathGlob.push([new minimatch.Minimatch(path.join(key, '**')), hash[key]])
            } else {
              paths[key.substr(2)] = typeof hash[key] == 'string' ? path.join('/', hash[key]).substr(1) : hash[key];
            }
          } catch (e) {
            paths[key.substr(2)] = typeof hash[key] == 'string' ? path.join('/', hash[key]).substr(1) : hash[key];
          }
        }
      }
    });
  }

  update(pkg.hardware || {});
  defaults && update(defaults);
  update({'./package.json': true})

  // Check files.
  effess.readdirRecursiveSync(dir, {
    inflateSymlinks: true,
    excludeHiddenUnix: true,
    filter: function (file, subdir) {
      // Exclude node_modules
      return !(path.normalize(subdir) == path.normalize(dir) && file == 'node_modules');
    }
  }).filter(function (file) {
    var ret = true;
    pathGlob.forEach(function (mod) {
      if (mod[0].match(file)) {
        ret = mod[1];
      }
    })
    Object.keys(paths).forEach(function (mod) {
      if (file == mod) {
        ret = paths[mod];
      }
    })
    if (ret) {
      filesOut[file] = ret === true ? file : ret;
    }
  })

  // Check submodules.
  var submodules = [];
  try {
    submodules = fs
      .readdirSync(path.join(dir, 'node_modules'))
      .filter(function (file) {
        return fs.statSync(path.join(dir, 'node_modules', file)).isDirectory();
      });
  } catch (e) { }
  submodules.filter(function (file) {
    var ret = true;
    moduleGlob.forEach(function (mod) {
      if (mod[0].match(file)) {
        ret = mod[1];
      }
    })
    Object.keys(modules).forEach(function (mod) {
      if (file == mod) {
        ret = modules[mod];
      }
    })
    if (ret) {
      modulesOut[file] = ret === true ? file : ret;
    }
  })
  
  // Merge in module output.
  Object.keys(modulesOut).forEach(function (key) {
    if (!fs.existsSync(path.join(dir, 'node_modules', modulesOut[key]))) {
      warn('Missing dependency', path.join(dir, 'node_modules', modulesOut[key]));
      return;
    }

    var moduleFilesOut = list(path.join(dir, 'node_modules', modulesOut[key]), null, null, propagate[key] || {})
    Object.keys(moduleFilesOut).forEach(function (file) {
      filesOut[path.join('node_modules', modulesOut[key], file)] = path.join('node_modules', modulesOut[key], moduleFilesOut[file]);
    })
  });

  return filesOut;
}

function root (file, next)
{
  if (fs.lstatSync(file).isDirectory()) {
    file = path.join(file, 'index.js');
  }
  fs.lstatSync(file);

  var pushdir = fs.realpathSync(path.dirname(file));

  // Find node_modules dir
  var pushdirbkp = pushdir;
  var relpath = '';
  while (path.dirname(pushdir) != pushdir && !fs.existsSync(path.join(pushdir, 'package.json')) && !fs.existsSync(path.join(pushdir, 'node_modules'))) {
    relpath = path.join(path.basename(pushdir), relpath);
    pushdir = path.dirname(pushdir);
  }

  // If we never find a package.json or it is the home directory, we've failed.
  if (path.dirname(pushdir) == pushdir) {
    return next(new Error('No package.json or node_modules found.'))
  }
  if (fs.realpathSync(osenv.home()) == fs.realpathSync(pushdir)) {
    return next(new Error('No package.json or node_modules found. (Cowardly refusing to use the home directory, even though ~/package.json or ~/node_modules exists.)'));
  }

  next(null, pushdir, path.join(relpath, path.basename(file)));
}

exports.list = list;
exports.root = root;