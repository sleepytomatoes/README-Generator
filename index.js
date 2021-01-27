const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
// function newUser(userEmail, projectTitle, projectDescription, installationMethod, usageInfo, licenseInfo, userContributing, userTests, userVersion) {
//     this.userEmail = userEmail;
//     this.projectTitle = projectTitle;
//     this.projectDescription = projectDescription;
//     this.installationMethod = installationMethod;
//     this.usageInfo = usageInfo;
//     this.licenseInfo = licenseInfo;
//     this.userContributing = userContributing;
//     this.userTests = userTests;
//     this.userVersion = userVersion;
// }



function getUserGitHub(response) {
    const { userName } = response;
    const queryUrl = `https://api.github.com/users/${userName}`;
    console.log('we are inside function')
    axios.get(queryUrl)
          .then(function ({ data }) {
            const { login, avatar_url } = data
            const readMeData = { ...response, gitHubName: login, gitPhoto: avatar_url }
            createReadMe(readMeData);
          })
          .catch(function(err) { return console.log('Username not found, enter "control C" and then run "node index.js"')});
        }




getUserInfo();


function getUserInfo() {
    inquirer.prompt(
[{
    type: "input",
    message: "What is your GitHub username?",
    name: "userName"
 },
{
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
    getUserGitHub(response)
}).catch(function(err) {
        console.log(err);
    });
}

const createReadMe = function(readMeData) {
    console.log("readMeData: ", readMeData)
    const readMeContent = 
    `##${readMeData.projectTitle} README
    
# Table of Contents
[Project Description] (#description
[Installation] (#installation)
[Usage] (#usage)
[License] (#license)
[Tests] (#tests)
[Version] (#version)

------

## Project Description <a name="desctiption"></a>
${readMeData.projectDescription}

## Installation <a name="installation"></a>
${readMeData.installationMethod}

## Usage <a name="usage"></a>
${readMeData.usageInfo}

## License <a name="license"></a>
${readMeData.licenseInfo}

## Tests <a name="tests"></a>

    `

    console.log("readMeContent: ", readMeContent)
    const filename = "README.md"
    fs.writeFile(filename, readMeContent, (err) =>
    err ? console.log(err) : console.log('Success!')
  );
}

