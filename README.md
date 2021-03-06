Link : https://mynotes-reactapp.netlify.app/

Technology stack :

JS framework :  ReactJS
Data API :  FaunaDB
Routing framework :  Reach Router
CSS framework :  AntDesign (AntD v3.9)
App icons/Form :  AntDesign (AntD v3.9)
Hosting :  Netlify
Authentication :  Netlify Authentication
To clone this repository locally, Enter git clone and the repository URL at your command line:

git clone https://github.com/ppate59/notes_app.git

Create a .env file in a project folder and add a line of code as below to add a secret key to call FaunaDB (Make sure to add this file in .gitignore),

REACT_APP_FAUNADB_KEY=<your faundDB secret key>

List of some useful yarn commands for this project,

1. yarn install :: Install all the dependencies listed within package.json in the local node_modules folder.
2. yarn add <package...> :: Adds a package to use in your current package.
3. yarn start :: Starts/Runs project locally on http://localhost:3000/
4. yarn build :: Create a build package for project deployment


Deployment steps:

1. Make sure all current code is pushed to master branch.
2. Open terminal and go in project folder
3. Run command “yarn build”
4. After build folder is ready, go to Netlify site -> Deploys tab -> Drag and drop build folder from project
5. Navigate to Overview tab and scroll down to "Production deploys" click on latest Production.
6. After you get “Site is live” message in deploy log, deployment is done.