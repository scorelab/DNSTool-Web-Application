# DNSTool-Web-Application

DNSTool-Frontend is the main access portal of the DNSTool which is designed to monitor the given set of internet resources like domains, IP, SOA, etc.  Frontend allows users to upload their scanning seed list(s) and control the scans as well as schedule them. This project is to design a responsible and user-friendly single-page application as the frontend (dashboard).

## User Guide

#### How to Setup

Clone the repository.

#### How to Use

Run `npm install` in `DNSTool-Web-Application` folder.

```
 cd DNSTool-Web-Application/
 npm install
```

First you need to create a `.env` file in `DNSTool-Web-Application` folder following the template provided in the file `env.example`<br/> <br/>

1. Sign in to https://console.firebase.google.com/.
2. Click **Add Project** and necessary information about the project.
3. Agree to the terms and click **Create Project**.
4. After creating the project, click **Add Firebase to your web app**.
5. Add app nick name and click register app.
6. Copy the firebase configuration.
7. Paste the configuration `.env` file.

You should fill in these values in their relevent fields in the `.env` file.

To run the project:  
 `$ npm start`

> **NOTE**: Before starting the server create a file named `.env` same as `.env.example` and add your **Firebase Configurations** in the file.

Visit [localhost:3000](http://localhost:3000) to browse.

