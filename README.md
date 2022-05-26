# List Maker API v2

An API built using Node and Express, and the successor to my first attempt at a Node-based API.

<div align="center">
  
| Metric | Prod | Dev |
| ----------- | ----------- | ----------- |
| CircleCI Build | ![CircleCI Build](https://img.shields.io/circleci/build/github/mittell/list-maker-api-v2/main?style=for-the-badge) | ![CircleCI Build](https://img.shields.io/circleci/build/github/mittell/list-maker-api-v2/dev?style=for-the-badge)
| SonarCloud Tech Debt | ![SonarCloud Tech Debt](https://img.shields.io/sonar/tech_debt/mittell_list-maker-api-v2/main?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge) | ![SonarCloud Tech Debt](https://img.shields.io/sonar/tech_debt/mittell_list-maker-api-v2/dev?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)
| Libraries.io Dependency Status | ![Libraries.io Dependency Status](https://img.shields.io/librariesio/github/mittell/list-maker-api-v2?style=for-the-badge) | ![Libraries.io Dependency Status](https://img.shields.io/librariesio/github/mittell/list-maker-api-v2?style=for-the-badge)
| GitHub Monthly Commits | ![GitHub Commits Current Month](https://img.shields.io/github/commit-activity/m/mittell/list-maker-api-v2/main?style=for-the-badge) | ![GitHub Commits Current Month](https://img.shields.io/github/commit-activity/m/mittell/list-maker-api-v2/dev?style=for-the-badge)
| GitHub Last Commit | ![GitHub Last Commit](https://img.shields.io/github/last-commit/mittell/list-maker-api-v2/main?style=for-the-badge) | ![GitHub Last Commit](https://img.shields.io/github/last-commit/mittell/list-maker-api-v2/dev?style=for-the-badge)

</div>

## About

After my first attempt to build an API using Node and Express with v1, I found there were many things I didn't know how to implement within the JavaScript and Node ecosystem.

During the development of v1 I found tools to assist with Dependency Injection and Inversion, along with cleaner ways to organise the structure of a Node project, and I felt that the heavy amount of tight-coupling between components really got in the way of writing good unit tests.

Plus, my use of TypeScript was a little archaic to say the least...

I decided to redo the API project, with the intention of implementing Dependency Injection and improving the Unit Test coverage of the project codebase. Along with the assumption I'd find new challenges and additional factors I had not considered this time round.

## Getting Started

Clone this repo, and make sure to run the commands mentioned below from your terminal within the root project directory.

### Prerequisites

Make use Node.js is installed, and npm is up to date:

    npm@latest -g

Run the provided setup script:

    npm run setup

Created a .env file in the project root, and make sure the following keys are added:

    PORT=<Add Port Number - e.g. 3000>
    NODE_ENV=<Add Environment - e.g. development>
    DB_URL=<Add DB PATH/URL>
    SENTRY_URL=<Add Sentry URL>
    JWT_SECRET=<Add Secret - Make it long and random!>

Run and debug the application with the dev script:

    npm run dev

Build and run the compiled version with the build and start scripts:

    npm run build
    npm run start

## Development Status

Development on this repo is paused for the time being, as there were a number of challenges encountered with the libraries chosen, along with their compatibility with one another.

After more homework is done on working with InversifyJS, inversify-express-utils, Typegoose, and Jest, then I'll come back to clean up what I have so far.

## Contact

Feel free to find and contact me at the following:

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/CMittell)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chris-mittell/)

</div>