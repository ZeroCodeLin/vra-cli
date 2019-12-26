const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const semver = require('semver');
const download = require('./download')

const question = function(name) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `project name: `,
            default: name || path.basename(path.resolve()),
            filter: function(val){
                return val ? val : path.basename(path.resolve());
            },
            validate: function(value) {
                const upperCaseReg = /^[A-Z]+$/;
                const underscoreReg = /^[/_][a-z0-9_]*$/;
                const periodReg = /^[/.][a-z0-9_]*$/;
                // const UrlFriendlyReg = /^[a-z/@][a-z0-9_]*$/;
                if (value.length > 214) return 'Sorry, name can no longer contain more than 214 characters.'
                if (upperCaseReg.test(value)) return 'Sorry, name can no longer contain capital letters.'
                if (underscoreReg.test(value)) return 'Sorry, name cannot start with an underscore.'
                if (periodReg.test(value)) return 'Sorry, name cannot start with a period.'
                // if (!UrlFriendlyReg.test(value)) return 'Sorry, name can only contain URL-friendly characters.'

                return true;
            }
        },{
            type: 'input',
            name: 'version',
            message: 'version: ',
            default: "1.0.0",
            validate: (val) => {
                return semver.valid(val) ? true : `Invalid version: "${val}"`;
            }
        },{
            type: 'input',
            name: 'description',
            message: 'description: '
        },{
            type: 'input',
            name: 'point',
            message: 'entry point'
        },{
            type: 'input',
            name: 'gitRepository',
            message: 'git repository: '
        },{
            type: 'input',
            name: 'keywords',
            message: 'keywords: '
        },{
            type: 'input',
            name: 'author',
            message: 'author: '
        },{
            type: 'rawlist',
            name: 'license',
            message: 'license: ',
            choices: [
                'ISC',
                'MIT'
            ]
        },{
            type: 'confirm',
            name: 'confirm',
            message: 'Is this OK?(yes)',
        }
    ]).then(answers => {
        file(answers)
    })
}

const file = function(options) {
    download('./').then((ss) => {
        const file = `${path.resolve()}/package.json`;
        let packageJson = fs.readJsonSync(file);
        packageJson = {
            ...packageJson,
            ...options
        }
        fs.writeJsonSync(file, packageJson)
    })
}

function initial(name) {
    question(name);
}


module.exports = initial