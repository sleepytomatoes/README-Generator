// setting constants to require dependancies 
const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');


// getUserGitHub takes in the response from getUserInfo and passes in the username to queryURL which is then used in our API call.
function getUserGitHub(response) {
    const { userName } = response;
    const queryUrl = `https://api.github.com/users/${userName}`;
    console.log('we are inside function')
    axios.get(queryUrl)
          .then(function ({ data }) {
            // login and avatar image are deconstructed from data
            const { login, avatar_url } = data
            // spread operator used to create a new object (readMeData) which will include new key/value pairs from the API call.
            const readMeData = { ...response, gitHubName: login, gitPhoto: avatar_url }
            createReadMe(readMeData);
          })
          // error handler function: if the promise cannot be carried out, an error will be logged in the console.
          .catch(function(err) { return console.log('Username not found, enter "control C" and then run "node index.js"')});
        }




getUserInfo();

// getUserInfo uses inquirer to prompt the user, turning user input into the value assigned to name key in the response object.
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

// createReadMe takes in all of the necessary data to create our README from readMeData, and declares a template literal to implement that data.
const createReadMe = function(readMeData) {
    console.log("readMeData: ", readMeData)
    const readMeContent = 
    `##${readMeData.projectTitle} README
    
# Table of Contents
1. [Project Description] (#description)
2. [Installation] (#installation)
3. [Usage] (#usage)
4. [License] (#license)
5. [Tests] (#tests)
6. [Version] (#version)

------

## Project Description <a name="description"></a>
${readMeData.projectDescription}

## Installation <a name="installation"></a>
${readMeData.installationMethod}

## Usage <a name="usage"></a>
${readMeData.usageInfo}

## License <a name="license"></a>
![License](https://img.shields.io/badge/License-${readMeData.licenseInfo}-brightgreen)

## Tests <a name="tests"></a>
${readMeData.userTests}

## Version <a name="version"></a>
![Version](https://img.shields.io/badge/Version-${readMeData.userVersion}-f39f37)


## Github 
Username: [@${readMeData.userName}](https://www.github.com/${readMeData.userName})
![Photo](${readMeData.gitPhoto})


## Contact
Email: ${readMeData.userEmail}

    `

    console.log("readMeContent: ", readMeContent)
    const filename = "README.md"
    // using node and the dependency fs, fs.writeFile takes in the file name and the data to be written in the form of a template literal.  It also takes in a callback error function if the function fails.
    fs.writeFile(filename, readMeContent, (err) =>
    err ? console.log(err) : console.log('Success!')
  );
}

