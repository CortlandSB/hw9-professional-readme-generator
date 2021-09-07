const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

const questions = [
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username.',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your your email address.',
  },
  {
    type: 'input',
    name: 'title',
    message: "Enter your project's name.",
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a short description of your project.',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Select a type of license for your project.',
    choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Which command should be run to install dependencies?',
    default: 'npm i',
  },
  {
    type: 'input',
    name: 'test',
    message: 'Which command should be run to run tests?',
    default: 'npm test',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'What should the user know about using this repo?',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'What should the user know about contributing to this repo?',
  },
];

function writeFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
  inquirer.prompt(questions).then((inquirerResponses) => {
    console.log('Generating README...');
    writeFile('README.md', generateMarkdown({ ...inquirerResponses }));
  });
}

init();
