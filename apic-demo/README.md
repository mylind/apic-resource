# bluepage-utility

1. This application needs to binding data cache service, pls modify the yaml file with the correct service name.

2. the configuration in app.json will loaded firstly, then the value will be overrided by ./config/app-<enviroment type>.json. For example, if you run locally, the CDB_URL value will using the one in ./config/app-development.json 

## How to use bluepage-utility

Clone the bluepage-utility repository, run `npm install` to grab the dependencies, and start hacking!

### Running the app

Runs like a typical express app:
    npm install
    bower install
    node app.js

### Running tests

Coming soon!

### Receiving updates from upstream

Just fetch the changes and merge them into your project with git.


## Directory Layout
    
    app.js              --> app config
    package.json        --> for npm
    public/             --> all of the files to be used in on the client side
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      js/               --> javascript files
        app.js          --> declare top-level app module
        controllers.js  --> application controllers
        directives.js   --> custom angular directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
        lib/            --> angular and 3rd party JavaScript libraries
          angular/
            angular.js            --> the latest angular js
            angular.min.js        --> the latest minified angular js
            angular-*.js          --> angular add-on modules
            version.txt           --> version number
    routes/
      api.js            --> route for serving JSON
      index.js          --> route for serving HTML pages and partials
      map.js            --> implentation for data cache service
      mapRouter.js      --> route for serving data cashe service
    views/
      index.jade        --> main page for app
      layout.jade       --> doctype, title, head boilerplate
      response.jade     --> response page sample
      error.jade        --> error page sample
      partials/         --> angular view partials (partial jade templates)
        partial1.jade
        partial2.jade

## To run in docker
docker build -t bluepage:0.1 .
docker run -it -d -p 3000:3000 --name bluepage bluepage:0.1
