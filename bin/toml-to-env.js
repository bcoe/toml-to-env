#!/usr/bin/env node

const tomlToEnv = require('../')
const shellEscape = require('shell-escape')
require('yargs')
  .usage('$0 <command|path>')
  .command(['export <path>', '*'], 'generate export commands from TOML', () => {}, (argv) => {
    tomlToEnv(argv.path, (err, env) => {
      if (err) {
        console.error(err.message)
        process.exit(1)
      } else {
        Object.keys(env).forEach((key) => {
          console.log(`export ${key}=${shellEscape([env[key]])}`)
        })
        process.exit(0)
      }
    })
  })
  .command('unset <path>', 'generate unset commands based on TOML config', () => {}, (argv) => {
    tomlToEnv(argv.path, (err, env) => {
      if (err) {
        console.error(err.message)
        process.exit(1)
      } else {
        Object.keys(env).forEach((key) => {
          console.log(`unset ${key}`)
        })
        process.exit(0)
      }
    })
  })
  .demandCommand(1, 'must provide path to TOML file')
  .help()
  .epilog('convert an enviornment stanza in a TOML file to export FOO=BAR')
  .parse()
