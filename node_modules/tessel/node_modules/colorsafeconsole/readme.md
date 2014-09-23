# colorsafeconsole

A simple wrapper for node.js console to prevent ANSI colours being output to streams that aren't a user shell (such as pipes or files).

## Usage

The supplied ````example.js```` 

    require('../colorsafeconsole')(console)
    require('../colors.js')
    console.log('console.log %s'.green,'printf-esque'.blue)
    console.warn('console.warn'.yellow)
    console.error("console.error".red)

behaves like

![example.js output](https://github.com/cjc/colorsafeconsole/raw/master/example.png)

## Probably very bad

This currently relies on the ````process.stdout._type```` property, which for all I know is going to vanish in 38 seconds.

## Credits

````stripColors```` is from Marak's [colors.js](https://github.com/Marak/colors.js), which is also the library that this is mostly intended to be used with.
