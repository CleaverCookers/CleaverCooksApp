# CleaverCooksApp
This project is the frontend of [The CleaverCooks Backend](https://github.com/CleaverCookers/CleaverCooksBackend) made in Angular. 
Even though this application is available on the web, the aim was to have a mobile application first and foremost. So we used [Angular Material](https://material.angular.io/) to generate our graphical components to mimic the look and feel of an Android application.
To communicate more dynamically with the backend, we use [GraphQL](https://graphql.org/) for queries.

## Try the app
You can find a production environment at https://cleavercookers.github.io/

## Project management
For the frontend and backend, we used Jira with a scrum-like approach.
You can find the planning here : https://ejcpnvprojects.atlassian.net/jira/software/projects/CC/boards/3/timeline

## Analysis
Customer requirements and business vocabulary can be found on Confluence here : https://ejcpnvprojects.atlassian.net/wiki/spaces/CC/overview

## Develop
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.4.
Install angular cli with `npm install -g @angular/cli`

### Git
We use the GitFlow branching strategy with a prefix containing the Jira task identifier. (Example: feature/CC-14-RecipeRanking)

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Capacitor
To have a mobile application we have added capacitor which is used to build a web app. We use Android Studio to emulate the app. 

Prerequisite :
Android Studio  : https://developer.android.com/studio
### Build
Don't forget to run `ng build` before adding android.
### Sync 
For updating the app you can use sync with the new build make. 
`npx cap sync android`
### Open on Android Studio
Open on android studio.
`npx cap open android`
### Further help
https://capacitorjs.com/docs/android
