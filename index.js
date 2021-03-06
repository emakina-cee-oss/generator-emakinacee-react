#!/usr/bin/env node
const {join} = require('path');
const {spawnSync} = require('child_process');
const program = require('commander');
const packageInfo = require('./package.json');

/**
 * GENERATE NEW PROJECT
 *
 * @param {string} name - name of the project
 * @param {Object} options - commander options object
 * @returns {undefined}
 */
const generateNewProject = (name, options) => {
    const args = [
        'emakinacee-react',
        name
    ];

    spawnSync(join(__dirname, 'node_modules', '.bin', 'yo'), args, {
        stdio: 'inherit',
        shell: true
    });
};

/**
 * GENERATE SCAFFOLD
 *
 * @param {string} type - the type of scaffold
 * @param {string} name - name that should be applied to generated files
 * @param {string} module - (optional) the module the new scaffold will be placed in
 * @param {Object} options - commander options object
 * @returns {undefined}
 */
const generateScaffold = (type, name, module, options) => {
    const args = [
        'emakinacee-react:gen',
        type,
        name
    ];
    if (module) args.push(module);
    if (options.connect) args.push('--connect');
    if (options.stateful) args.push('--stateful');

    spawnSync(join(__dirname, 'node_modules', '.bin', 'yo'), args, {
        stdio: 'inherit',
        shell: true
    });
};


program.version(packageInfo.version);

program
    .command('new <name>')
    .description('Creates a new project')
    .action(generateNewProject);

program
    .command('generate <type> <name> [module]')
    .description('Generate a new scaffold')
    .option('-c, --connect', 'Connect Component to Cerebral')
    .option('-s --stateful', 'Generate Stateful Component')
    .action(generateScaffold);

program
    .command('g <type> <name> [module]')
    .description('Shorthand for generate')
    .option('-c, --connect', 'Connect Component to Cerebral')
    .option('-s --stateful', 'Generate Stateful Component')
    .action(generateScaffold);

program.parse(process.argv);

// Show help if no args applied.
if (!program.args.length) {
    program.help();
}
