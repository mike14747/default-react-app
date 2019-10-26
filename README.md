# Default React App Setup

## What is this project?
* This repo contains my default React JS app starting point.
* It's a functioning bare bones React app using the MVC model.
* In React, there are 3 components (2 functional and 1 that's a class) in App.js with some simple routing and navigation.
* There is a test database included with a single table and a single row of data in that table... just for testing.
* It includes just the bare bones npm dependencies (dotenv, express, if-env and mysql2).
* Several devDependencies are installed... mostly for linting.

## What was the process of getting to this point?

* Run **create-react-app default-react-app** in the terminal.
* Since React was installed using yarn, I used yarn instead of npm for everything. I didn't want to have a **yarn.lock** file on the front end and a **package-lock.json** file on the backend.
* I deleted the **.git** folder that was installed by **create-react-app** by default. I linked it to this github repo after I had the main folder/file structure in place.
* I created a **client** folder, then moved all the React files into it (**node_modules, public, src, package.json and yarn.lock**)
* From the root of the folder, I ran **yarn init -y** to create a **package.json** for the backend.
* I create an **.env** file in the root with the following contents:
```
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PW=<your_mysql_password>
DB_NAME=testDB1
```
* I created a **server.js** file in the root and only put the bare minimum in it for now.
* The following folders were created: **client/src/components**, **client/src/pages**, **client/src/pages/home**, **client/src/components/header**, **client/src/components/navbar**, **client/src/components/footer**.
* Each subfolder of **client/src/components** and **client/src/pages** got an empty .js file of the same name as it's directory (eg: **client/src/pages/home/home.js**). Otherwise the empty folders wouldn't get pushed to this repo.
* The following packages were installed:
```
yarn add dotenv express if-env mysql2
```
* The following packages were installed as dev dependencies in the following way:
```
yarn add --dev eslint@6.5.1 eslint-config-standard babel-eslint@10.0.3 eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard concurrently nodemon
```
* My reason for implicitly specifying a version for **eslint** and **babel-eslint** was because they are also installed by React in **client/node_modules** and it's important to not have different versions installed in different folder levels.
* The following lines were added to **package.json**:
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
* The following line was added to the **client/package.json**:
```
"proxy": "http://localhost:3001/"
```
* The following MVC folders/files were created on the root: **config/connection.js**, **config/schema.sql** (with schema for a test database), **config/seeds.sql** (with the seeds data for the test database), **models/index.js**, **models/user.js** (as a test model), **controllers/index.js** and **controllers/testController.js** (as a test controller file). These comprise the M and C portions of MVC.
* Then I linked the local folder to the remote github repo:
```
git init
git add .
git commit -m "initial file upload after linking the local and remote repos"
git remote add origin git@github.com:mike14747/default-react-app.git
git push -u origin master
```
* Ran **yarn update** because 3 packages React installed had security vulnerabilities. Doing this fixed all 3 issues.
* The following files were added at the root location: **.eslintrc.json** and **.eslintignore**. These are my linting config and ignore files which contain my linting rules.
* I had to remove the following line from **client/package.json** to get my root eslint config/rules to work for the client folder:
```
"eslintConfig": {
    "extends": "react-app"
},
```
* Cleaned up all of the linting errors in the client folder (which were all the default React app's files).
* Some sample code from React's example docs was added to **client/src/App.js** in place of the default code... which loads a simple 3 page navigation app.
* I also replaced the functional **User** component in **App.js** with a **User** class and set it up to fetch data from the test database and render it to the browser just to test the whole MVC system.

## How can you get started using this project?
1. Clone this repo onto your local computer:
```
git clone git@github.com:mike14747/default-react-app.git
```
2. Create a **.env** file in the root folder with the following content:
```
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PW=<your-mysql-password>
DB_NAME=testDB1
```
3. Install the npm packages. From the root directory, run:
```
yarn install
```
4. Install the test database by using the schema and seeds files (**config/schema.sql** and **config/seeds.sql**).

## This project was created and is maintained by:

* Mike Gullo
* This project's github repo: https://github.com/mike14747/default-react-app
* Me on github: https://github.com/mike14747
* Contact me at: mike14747@oh.rr.com for more info about this project.