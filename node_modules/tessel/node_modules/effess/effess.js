var fs = require('fs')
var path = require('path')

module.exports = exports = fs;

// inflateSymlinks => should follow symlinks?
// excludeHiddenUnix => don't match files with leading periods
// filter == filter(file, dir) returns bool
// fullPath => list full or relative directory path? default false
function readdirRecursiveSync (sourceDir, opts)
{
  opts = opts || {};
  var returnSourceDir = opts.symSourceDir || sourceDir;

  var childopts = JSON.parse(JSON.stringify(opts));
  childopts.fullPath = true;

  var out = [], outarrs = [];
  var files = fs.readdirSync(sourceDir);
  fileIter: for (var i = 0; i < files.length; i++) {
    // ignores all files or directories which match the RegExp in opts.filter
    if (opts.filter && !opts.filter(files[i], sourceDir)) {
      continue;
    }
    if (opts.excludeHiddenUnix && /^\./.test(files[i])) {
      continue;
    }

    var currFile = fs.lstatSync(path.join(sourceDir, files[i]));

    if (currFile.isDirectory()) {
      /*  recursion this thing right on back. */
      outarrs.push(readdirRecursiveSync(path.join(sourceDir, files[i]), childopts));
    } else if (currFile.isSymbolicLink() && opts.inflateSymlinks) {
      var symlinkFull = fs.readlinkSync(path.join(sourceDir, files[i]));

      do {
        try {
          var tmpCurrFile = fs.lstatSync(symlinkFull[0] == '/' ? symlinkFull : path.join(sourceDir, symlinkFull));
        } catch (e) {
          continue fileIter;
        }
      } while (tmpCurrFile.isSymbolicLink() && (symlinkFull = fs.readlinkSync(symlinkFull[0] == '/' ? symlinkFull : path.join(sourceDir, symlinkFull))));
      if (tmpCurrFile.isDirectory()) {
        childopts.symSourceDir = path.join(sourceDir, files[i]);
        outarrs.push(readdirRecursiveSync(symlinkFull[0] == '/' ? symlinkFull : path.join(sourceDir, symlinkFull), childopts));
        delete childopts.symSourceDir;
      } else {
        /*  At this point, we've hit a file actually worth copying... so copy it on over. */
        out.push(path.join(returnSourceDir, files[i]))
      }
    } else {
      /*  At this point, we've hit a file actually worth copying... so copy it on over. */
      out.push(path.join(returnSourceDir, files[i]));
    }
  }
  return out.concat.apply(out, outarrs).map(function (arg) {
    return opts.fullPath ? arg : path.relative(sourceDir, arg);
  });
};

exports.readdirRecursiveSync = readdirRecursiveSync;