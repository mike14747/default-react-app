# Default React App Setup

## What is this project?

-   This repo contains my default React JS app starting point.
-   It's a functioning bare bones React app using the MVC model.
-   In React, there are 4 components (3 functional and 1 that's a class) in App.js with some simple routing and navigation.
-   There is a test database included with a single table and a single row of data in that table... just for testing.
-   It includes just the bare bones npm dependencies (dotenv, express, if-env and mysql2).
-   Several devDependencies are installed... mostly for linting.

## What was the process of getting to this point?

-   Run the following in the terminal:

```
npx create-react-app default-react-app
```

-   React was installed using yarn, but I wanted to use npm instead (mainly for access to **npm audit fix**... because I don't know of a good yarn alternative).
-   I ran **npm install** in the client folder... which generated a **package-lock.json** file, then I deleted the **yarn.lock** file.
-   I deleted the **.git** folder that was installed by **create-react-app** by default. I linked it to this github repo after I had the main folder/file structure in place.
-   The following lines were deleted from **public/index.html** (and the icon and image they referenced were also deleted):

```
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="apple-touch-icon" href="logo192.png" />
```

-   The css file: **src/App.css** was deleted... as was the default React logo: **src/logo.svg**
-   I created a **client** folder, then moved all the React files into it (**node_modules, public, src, package.json and package-lock.json**)
-   From the root of the folder, I ran **npm init -y** to create a **package.json** for the backend.
-   I created an **.env** file in the root with the following contents:

```
PORT=3001
NODE_ENV=dev
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PW=<your_mysql_password>
DB_NAME=testDB1
```

-   I created a **server.js** file in the root and only put the following bare minimum in it for now (note: the comments are included here for clarity, but aren't in the real server.js file):

```
require('dotenv').config();
// destructure the process.env object
const { PORT, NODE_ENV } = process.env;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// include the function to connection to the database
const connectionPool = require('./config/connectionPool');

// try to connect to the database
connectionPool.mysqlConnect()
    .then(() => {
        // the database connection was successful, so use the controller /api routes
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        // the database connection failed, so all calls to the /api route will have status code 500 returned
        console.error('Failed to connect to the database!\n' + error);
        app.get('/api', (req, res) => {
            res.status(500).send('There is no connection to MySQL!');
        });
    })
    .finally(() => {
        // regardless of whether the database connection was successful, send all routes not matching the controller routes to the react app
        if (NODE_ENV === 'production') {
            app.use(express.static('./client/build'));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, './client/build/index.html'));
            });
        }
        app.listen(PORT, () => {
            console.log('Server is listening on port ' + PORT);
        });
    });
```

-   The following folders were created: **client/src/components**, **client/src/pages**, **client/src/pages/home**, **client/src/components/header**, **client/src/components/navbar**, **client/src/components/footer**.
-   Each subfolder of **client/src/components** and **client/src/pages** got an empty .js file of the same name as it's directory (eg: **client/src/pages/home/home.js**). Otherwise the empty folders wouldn't get pushed to this repo.
-   The following packages were installed:

```
npm i dotenv express if-env mysql2
```

-   The following linting packages (plus concurrently and nodemon) were installed as devDependencies in the following way:

```
npm i --save-dev babel-eslint eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-standard concurrently nodemon
```

-   The following lines were added to **package.json**:

```
"main": "server.js",
"scripts": {
    "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\"",
    "start:prod": "node server.js",
    "client": "cd client && npm run start",
    "server": "nodemon server.js",
    "install": "if-env NODE_ENV=production || npm run install:dev",
    "install:dev": "cd client && npm install",
    "build": "cd client && npm run build"
},
"license": "MIT",
"author": "Mike Gullo",
"repository": {
    "type": "git",
    "url": "git+https://github.com/mike14747/default-react-app.git"
},
```

-   The following line was added to the **client/package.json** (to use the express backend while the development server is running):

```
"proxy": "http://localhost:3001/"
```

-   The following MVC folders/files were created on the root: **config/connectionPool.js**, **config/schema.sql** (with schema for a test database), **config/seeds.sql** (with the seeds data for the test database), **models/user.js** (as a test model), **controllers/index.js** and **controllers/testController.js** (as a test controller file). These comprise the M and C portions of MVC.
-   Then I linked the local folder to the remote github repo:

```
git init
git add .
git commit -m "Initial file upload after linking the local and remote repos."
git remote add origin git@github.com:mike14747/default-react-app.git
git push -u origin master
```

-   Ran **npm update** and **npm audit fix** in the root and in the client folder because some packages had security vulnerabilities.
-   The following files were added at the root location: **.eslintrc.json** and **.eslintignore**. These are my linting config and ignore files which contain my linting rules.
-   I had to remove the following line from **client/package.json** to get my root eslint config/rules to work for the client folder:

```
"eslintConfig": {
    "extends": "react-app"
},
```

-   Cleaned up all of the linting errors in the client folder (which were all in the default React app's files).
-   Some sample code from React's example docs was added to **client/src/App.js** in place of the default code... which loads a simple 3 page (plus a NoMatch page) navigation app.
-   I also replaced the functional **User** component in **App.js** with a **User** class and set it up to fetch data (using **axios**) from the test database and render it to the browser just to test the whole MVC system.

## How can you get started using this project?

1. Clone this repo onto your local computer:

```
git clone git@github.com:mike14747/default-react-app.git
```

2. Create a **.env** file in the root folder with the following content:

```
PORT=3001
NODE_ENV=dev
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PW=<your-mysql-password>
DB_NAME=testDB1
```

3. Install the npm packages. From the root directory, run:

```
npm install
```

4. Install the test database by using the schema and seeds files (**config/schema.sql** and **config/seeds.sql**).

## This project was created and is maintained by:

-   Mike Gullo
-   This project's github repo: https://github.com/mike14747/default-react-app
-   Me on github: https://github.com/mike14747
-   Contact me at: mike14747@oh.rr.com for more info about this project.
