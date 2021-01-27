const inquirer = require('inquirer');
const createReadMe = require('./create_readme.js');

function getUserInfo() {
    inquirer.prompt(
[{
    type: "input",
    message: "Enter your email address",
    name: "userEmail"
  },
{
    type: "input",
    message: "Enter the project title",
    name: "projectTitle"
  },
{
    type: "input",
    message: "Add a description of your project",
    name: "projectDescription"
  },
{
    type: "input",
    message: "Enter instructions for installation",
    name: "installationMethod"
  },
{
    type: "input",
    message: "Enter the usage information",
    name: "usageInfo"
  },
{
    type: "input",
    message: "Enter license type",
    name: "licenseInfo"
  },
{
    type: "input",
    message: "Enter tests",
    name: "userTests"
  },
{
    type: "input",
    message: "Enter version number",
    name: "userVersion"
}])
.then((response) => {

    let readMeData = new newUser(gitHubName, gitPhotoUrl, response.userEmail, response.projectTitle, response.projectDescription, response.installationMethod, response.usageInfo, response.licenseInfo, response.userContributing, response.userTests, response.userVersion);

    createReadMe(readMeData);
})
    .catch(function(err) {
        console.log(err);
    });
}

    getUserInfo();
