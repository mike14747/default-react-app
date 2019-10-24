## Default React App Setup
This repo contains my default React JS app starting point.

#### Here's my step by step process to get to this point:

* Run 'create-react-app default-react-app' in the terminal.
* Since React was installed using yarn, I used yarn instead of npm for everything. I didn't want to have a yarn.lock file on the front end and a package-lock.json file on the backend.
* I deleted the '.git' folder that was installed by 'create-react-app' by default. I linked it to this github repo after I had the main folder/file structure in place.
* I created a 'client' folder, then moved all the React files into it (node_modules, public, src, package.json and yarn.lock)
* From the root of the folder, I ran 'yarn init -y' to create a 'package.json' for the backend.
* I create an '.env' file in the root with just this one line: 'Port=3001'.
* I created a 'server.js' file in the root and only put the bare minimum in it for now.
* The following folders were created: 'client/src/components', 'client/src/pages', 'client/src/pages/home', 'client/src/components/header', 'client/src/components/navbar', 'client/src/components/footer'.
* Each subfolder of 'client/src/components' and 'client/src/pages' got an empty .js file of the same name as it's directory (eg: 'client/src/pages/home/home.js'). Otherwise the empty folders wouldn't get pushed to this repo.
* The following packages were installed:
```
yarn add dotenv express if-env
```
* The following packages were installed as dev dependencies in the following way:
```
yarn add --dev eslint@6.5.1 eslint-config-standard babel-eslint@10.0.3 eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard concurrently nodemon
```
* My reason for implicitly specifying a version for 'eslint' and 'babel-eslint' was because they are also installed by React in the client node_modules folder and since those exact versions were installed by React, it's important to not have version conflicts in different folders.
* The following lines were added to 'package.json':
```
"main": "server.js",
"scripts": {
    "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:prod": "node server.js",
    "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
    "client": "cd client && npm run start",
    "install": "cd client && npm install",
    "build": "cd client && npm run build",
    "test": "echo \"Error: no test specified\" && exit 1"
},
"author": "Mike Gullo"
```
* The following line was added to the 'client/package.json':
```
"proxy": "http://localhost:3001/"
```
* The following folders were created on the root: 'config' (which will house the database schema and seeds files), 'models' (which will house all the database interactive functions) and 'controllers' (which will house all the route/controller files).
* The following empty files were added: 'config/schema.sql', 'config/seeds.sql', 'models/index.js', 'controllers/index.js'.
* Then I linked the local folder to the remote github repo:
```
git init
git add .
git commit -m "initial file upload after linking the local and remote repos"
git remote add origin git@github.com:mike14747/default-react-app.git
git push -u origin master
```
* Ran 'yarn update' because 3 packages React installed had security vulnerabilities. Doing this fixed all 3 issues.
* The following files were added at the root location: '.eslintrc.json' and '.eslintignore'. These are my linting config and ignore files which contain my linting rules.
* I had to remove the following line from 'client/package.json' to get eslint to use my linting configuration in the root folder:
```
"eslintConfig": {
    "extends": "react-app"
},
```
* Cleaned up all of the linting errors in the client folder (which were all the default React app's files).
* Some sample code from React's example docs was added to 'client/src/App.js' in place of the default code... which loads a simple 3 page navigation app.

## This project was created and is maintained by:

* Mike Gullo
* This project's github repo: https://github.com/mike14747/default-react-app
* Me on github: https://github.com/mike14747
* Contact me at: mike14747@oh.rr.com for more info about this project.