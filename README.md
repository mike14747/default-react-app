# Default React App Setup

## What is this project?

-   This repo contains my default React JS app starting point.
-   It's a functioning bare bones React app using an Express server and the MVC methodology.
-   There are several React components set up with some simple routing and navigation.
-   There is a test database included with a single table and a single row of data in that table... just for testing.
-   It includes just some bare bones backend npm dependencies (dotenv, express, if-env and mysql2).
-   Several backend devDependencies are installed... mostly for linting.

## What was the process of getting this up and running?

-   Run the following in the terminal:

```
npx create-react-app default-react-app
```

-   React was installed using yarn, but I wanted to use npm instead (mainly for access to **npm audit fix**... because I don't know of a good yarn alternative).
-   I ran **npm install**... which generated a **package-lock.json** file, then I deleted the **yarn.lock** file.
-   I deleted the **.git** folder that was installed by **create-react-app** by default. I linked it to this github repo after I had the main folder/file structure in place.
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

---

### Deleted code/files

-   The following lines were deleted from **public/index.html**:

```
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="apple-touch-icon" href="logo192.png" />
```

-   The icon and image the the above code referenced were also deleted from **client/public**
-   The css file: **client/src/App.css** was deleted... as was the default React logo: **client/src/logo.svg**

---

-   The following folders were created: **client/src/components**, **client/src/pages**, **client/src/pages/home**, **client/src/components/header**, **client/src/components/navbar**, **client/src/components/footer**.
-   Each subfolder of **client/src/components** and **client/src/pages** got an empty .js file of the same name as it's directory (eg: **client/src/pages/home/home.js**). Otherwise the empty folders wouldn't get pushed to this repo.
-   The following npm packages were installed:

```
npm i dotenv express if-env mysql2
```

-   The following linting packages (plus concurrently and nodemon) were installed as devDependencies in the following way:

```
npm i --save-dev eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-standard concurrently nodemon
```

---

### Express server

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
        console.log('An error occurred connecting to the database!\n', error.message);
        app.get('/api/*', (req, res) => {
            res.status(500).send('There is no connection to the database!');
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

---

-   The following lines were added to the root **package.json**:

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

---

### Linting

-   The following files were added at the root location: **.eslintrc.json** and **.eslintignore**. These are my linting config and ignore files which contain my linting rules.
-   I had to remove the following line from **client/package.json** to get my root **eslint config and rules** to work for the client folder:

```
"eslintConfig": {
    "extends": "react-app"
},
```

-   Cleaned up all of the linting errors in the default React app's files (client/src/App.js, etc) which didn't match my linting rules.

---

-   Some basic css, components, pages, navigation and routes **client/src/App.js** in place of the default code... which renders a basic functioning app.
-   I also replaced the functional **User** component in **App.js** with a **User** class and set it up to fetch data (using **axios**) from the test database and render it to the browser just to test the whole MVC system.
-   Added header and footer components to **client/src/components**, then added them to client/src/App.js to be rendered with every component inside the Router (before and after the routes).

---

### Images and CSS

-   Added a **client/public/images** folder. Any images in this folder can be accessed from anywhere in the React app using the **/images** prefix in the src path.
-   A sample image was added to: **client/public/images** so I could test the structure in a React component.
-   Added a **client/src/css** folder for general css for the app. This is because the React app can't use any css resourses outside the **client/src** folder.
-   A couple of css files were added to: **client/src/css** and I've imported them in **client/src/App.js**. At this point they're available to use in any React components/pages.

---

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
-   Contact me at: mikegullo4747@gmail for more info about this project.
