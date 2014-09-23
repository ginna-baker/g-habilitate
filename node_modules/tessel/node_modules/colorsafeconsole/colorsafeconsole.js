function stripColors(str) {
   return ("" + str).replace(/\u001b\[\d+m/g, '')
} 

function stripColoursFromArgs(args) {
  for(var i=0;i<args.length;i++) {
    if (typeof(args[i]) == 'string') {
      args[i] = stripColors(args[i])
    }
  }
  return args;
}

module.exports = function(console) { 
  console.rawlog = console.log;
  console.rawwarn = console.warn;
  console.rawerror = console.error;

  console.log = function() {
    return console.rawlog.apply(null, process.stdout._type != 'tty' ? stripColoursFromArgs(arguments) : arguments)
  }

  console.warn = function() {
    return console.rawwarn.apply(null, process.stderr._type != 'tty' ? stripColoursFromArgs(arguments) : arguments)
  }

  console.error = function() {
    return console.rawerror.apply(null, process.stderr._type != 'tty' ? stripColoursFromArgs(arguments) : arguments)
  }
}

