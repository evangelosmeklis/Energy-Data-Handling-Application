energy
======

CLI for Softeng

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/energy.svg)](https://npmjs.org/package/energy)
[![Downloads/week](https://img.shields.io/npm/dw/energy.svg)](https://npmjs.org/package/energy)
[![License](https://img.shields.io/npm/l/energy.svg)](https://github.com/evangelosmeklis/energy/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g energy
$ energy COMMAND
running command...
$ energy (-v|--version|version)
energy/0.0.0 linux-x64 node-v8.10.0
$ energy --help [COMMAND]
USAGE
  $ energy COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`energy hello [FILE]`](#energy-hello-file)
* [`energy help [COMMAND]`](#energy-help-command)

## `energy hello [FILE]`

describe the command here

```
USAGE
  $ energy hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ energy hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/evangelosmeklis/energy/blob/v0.0.0/src/commands/hello.ts)_

## `energy help [COMMAND]`

display help for energy

```
USAGE
  $ energy help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
