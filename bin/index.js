#!/usr/bin/env node
const cli = require('cac')();
const initial = require('../lib/commands/initial.js')
cli.help();

cli.version(require('../package.json').version);

cli.option('init', 'init project');
cli.command('init <name>', 'init project')
    .action((name, b) => {
        initial(name);
    });

const parsed = cli.parse();